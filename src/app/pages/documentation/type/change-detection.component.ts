import { Component } from '@angular/core';

@Component({
    template: `
        <div class="subline">Type</div>

        <h2>Change detection</h2>

        <p>
            Change detection is a process that creates a delta of two objects from the same type. It allows you to create
            a patch structure, store only the deltas, or just detect all changes in general and react however you want.
        </p>

        <p>
            The change detection in Deepkit Type is based on snapshots. A snapshot is a data reference-less representation 
            of your type that you can safely store (as JSON) and safely compare.
        </p>

        <textarea codeHighlight title="app.ts">
            import { buildChanges, createSnapshot, ReflectionClass } from '@deepkit/type';
            
            class Config {
                backgroundColor?: number = 0x002200;
                profileColor: number = 0x552200;
            
                image?: Uint8Array;
            
                resetBackground() {
                    this.backgroundColor = undefined;
                }
            }
            
            const config = new Config();
            let lastSnapshot = createSnapshot(ReflectionClass.from(Config), config);
            let changes = buildChanges(ReflectionClass.from(Config), lastSnapshot, config);
            
            //no changes made to config yet
            console.log('changes 1', changes.$set);
            
            config.backgroundColor = 42;
            changes = buildChanges(ReflectionClass.from(Config), lastSnapshot, config);
            //changes made to config
            console.log('changes 2', changes.$set);
            
            //snapshot the current state
            lastSnapshot = createSnapshot(ReflectionClass.from(Config), config);
            
            changes = buildChanges(ReflectionClass.from(Config), lastSnapshot, config);
            //No changes detected anymore
            console.log('changes 3', changes.$set);
            
            //change something
            config.backgroundColor = undefined;
            changes = buildChanges(ReflectionClass.from(Config), lastSnapshot, config);
            //No changes detected anymore
            console.log('changes 4', changes.$set);
        </textarea>

        The output of this script is:

        <textarea codeHighlight>
            $ ts-node app.ts
            changes 1 undefined
            changes 2 { backgroundColor: 42 }
            changes 3 undefined
            changes 4 { backgroundColor: undefined }
        </textarea>
    `
})
export class DocTypeChangeDetectionComponent {
}
