export class Note {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string,
        public ownerId: string,
        public bannerUrl?: string,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
    ) { }

    updateContent(newContent: string) {
        this.content = newContent;
        this.updatedAt = new Date();
    }

    updateTitle(newTitle: string) {
        this.title = newTitle;
        this.updatedAt = new Date();
    }

    updateBanner(newBannerUrl: string) {
        this.bannerUrl = newBannerUrl;
        this.updatedAt = new Date();
    }
}
