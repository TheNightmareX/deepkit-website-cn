import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">ORM</div>

        <h2>Relations</h2>

        <p>
            Relations allow you to connect two entities in a certain way. This is usually
            done in databases using the concept of <a href="https://en.wikipedia.org/wiki/Foreign_key">foreign keys</a>. 
            Deepkit ORM supports relations for all official database adapters.
        </p>

        <p>
            A relation is annotated using the <code>Reference</code> type decorator. Usually, a relation also has
            a reverse relation, which is annotated using the <code>BackReference</code> type, but is only
            needed if the back relation wants to be used in a database query. Back references are only virtual.
        </p>

        <h3>One to many</h3>

        <p>
            The entity that stores a reference is usually called the "owning side" or the one that "owns" the reference.
            The following shows two entities with a one-to-many relation between <i>User</i> and <i>Post</i>.
            It means one user can have multiple posts. The Post entity owns the relation of Post->User. 
            In the database itself, there is now a field Post."author" that holds the primary key of User. 
        </p>

        <textarea codeHighlight="">
            import { SQLiteDatabaseAdapter } from '@deepkit/sqlite';
            import { entity, PrimaryKey, AutoIncrement, Reference } from '@deepkit/type';
            import { Database } from '@deepkit/orm';
            
            async function main() {
                @entity.name('user').collectionName('users')
                class User {
                    id: number & PrimaryKey & AutoIncrement = 0;
                    created: Date = new Date;
            
                    constructor(public username: string) {
                    }
                }
            
                @entity.name('post')
                class Post {
                    id: number & PrimaryKey & AutoIncrement = 0;
                    created: Date = new Date;
            
                    constructor(
                        public author: User & Reference,
                        public title: string
                    ) {
                    }
                }
            
                const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [User, Post]);
                await database.migrate();
            
                const user1 = new User('User1');
                const post1 = new Post(user1, 'My first blog post');
                const post2 = new Post(user1, 'My second blog post');
            
                await database.persist(user1, post1, post2);
            }

            main();
        </textarea>

        <p>
            Owning sides are annotated using <code>Reference</code>. References are not selected in queries by default.
            See chapter <a routerLink="/documentation/orm/query" fragment="joins">ORM Query / Joins</a> for more information.
        </p>

        <h3>Many to one</h3>

        <p>
            An owning reference typically has a reverse reference which is usually called many-to-one. 
            It's a virtual reference only, since it's not reflected in the database itself.
            A back reference is annotated using <code>BackReference</code> and is mainly used for reflection
            and query joins. If you add a back reference from User to Post, you will be able to join Posts directly from User queries.
        </p>

        <textarea codeHighlight>
            @entity.name('user').collectionName('users')
            class User {
                id: number & PrimaryKey & AutoIncrement = 0;
                created: Date = new Date;
            
                posts?: Post[] & BackReference;

                constructor(public username: string) {
                }
            }
        </textarea>
        
        <textarea codeHighlight>
            //[ { username: 'User1', posts: [ [Post], [Post] ] } ]
            const users = await database.query(User).select('username', 'posts').joinWith('posts').find();
        </textarea>
        
        <h3>Many to many</h3>
        
        <p>
            A many-to-many relation allows you to connect many records with many others. It can be used for example for
            users in groups. A user can be in no, one, or many groups. Consequently, a group can have zero, one, or many users in it.
        </p>
        
        <p>
            Many-to-many relations are usually implemented via a pivot entity. The pivot entity holds the actual owning
            references to two other entities, and those two entities have back references to the pivot entity.
        </p>
        
        <textarea codeHighlight>
            @entity.name('user')
            class User {
                id: number & PrimaryKey & AutoIncrement = 0;
                created: Date = new Date;
        
                groups?: Group[] & BackReference<{via: typeof UserGroup}>;
        
                constructor(public username: string) {
                }
            }
        
            @entity.name('group')
            class Group {
                id: number & PrimaryKey & AutoIncrement = 0;
            
                users?: User[] & BackReference<{via: typeof UserGroup}>;

                constructor(public name: string) {
                }
            }
        
            //the pivot entity
            @entity.name('userGroup')
            class UserGroup {
                id: number & PrimaryKey & AutoIncrement = 0;
        
                constructor(
                    public user: User & Reference, 
                    public group: Group & Reference,
                ) {
                }
            }
        </textarea>
        
        <p>
            With these types you can now create users and groups, and connect them using the pivot entity.
            By using a back reference in User we can fetch the groups directly with a User query.
        </p>
        
        <textarea codeHighlight>
            const database = new Database(new SQLiteDatabaseAdapter(':memory:'), [User, Group, UserGroup]);
            await database.migrate();
        
            const user1 = new User('User1');
            const user2 = new User('User2');
            const group1 = new Group('Group1');
        
            await database.persist(user1, user2, group1, new UserGroup(user1, group1), new UserGroup(user2, group1));
        
            //[
            //   { id: 1, username: 'User1', groups: [ [Group] ] },
            //   { id: 2, username: 'User2', groups: [ [Group] ] }
            // ]
            const users = await database.query(User)
                .select('username', 'groups')
                .joinWith('groups')
                .find();
        </textarea>
        
        <p>
            To unlink a user from a group, we drop the record of UserGroup:
        </p>
        <textarea codeHighlight>
            const users = await database.query(UserGroup).filter({user: user1, group: group1}).deleteOne();
        </textarea>
    `
})
export class DocORMRelationsComponent {
}
