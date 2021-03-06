import {LocationStrategy} from '@angular/common';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AnchorService {
    constructor(
        private locationStrategy: LocationStrategy,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    /**
     * Intercept clicks on `HTMLAnchorElement` to use `Router.navigate()`
     * when `href` is an internal URL not handled by `routerLink` directive.
     * @param event The event to evaluated for link click.
     */
    interceptClick(event: Event) {
        const element = event.target;
        if (!(element instanceof HTMLAnchorElement)) {
            return;
        }
        const href = element.getAttribute('href') || '';
        if (this.isExternalUrl(href) || this.isRouterLink(element)) {
            return;
        }
        this.navigate(href);
        event.preventDefault();
    }

    /**
     * Navigate to URL using angular `Router`.
     * @param url Destination path to navigate to.
     * @param replaceUrl If `true`, replaces current state in browser history.
     */
    navigate(url: string, replaceUrl = false) {
        const urlTree = this.getUrlTree(url);
        this.router.navigated = false;
        this.router.navigateByUrl(urlTree, {replaceUrl});
    }

    /**
     * Transform a relative URL to its absolute representation according to current router state.
     * @param url Relative URL path.
     * @return Absolute URL based on the current route.
     */
    normalizeExternalUrl(url: string): string {
        if (this.isExternalUrl(url)) {
            return url;
        }
        const urlTree = this.getUrlTree(url);
        const serializedUrl = this.router.serializeUrl(urlTree);
        return this.locationStrategy.prepareExternalUrl(serializedUrl);
    }

    /**
     * Scroll view to the anchor corresponding to current route fragment.
     */
    scrollToAnchor() {
        const url = this.router.parseUrl(this.router.url);
        if (url.fragment) {
            this.navigate(this.router.url, true);
        }
    }

    private getUrlTree(url: string): UrlTree {
        const urlPath = this.stripFragment(url) || this.stripFragment(this.router.url);
        const urlFragment = this.router.parseUrl(url).fragment || '';
        return this.router.createUrlTree([urlPath], {relativeTo: this.route, fragment: urlFragment});
    }

    private isExternalUrl(url: string): boolean {
        return /^(?!http(s?):\/\/).+$/.exec(url) == null;
    }

    private isRouterLink(element: HTMLAnchorElement): boolean {
        return element.getAttributeNames().some(n => n.startsWith('_ngcontent'));
    }

    private stripFragment(url: string): string {
        const match = /[^#]*/.exec(url);

        return match ? match[0] : '';
    }
}
