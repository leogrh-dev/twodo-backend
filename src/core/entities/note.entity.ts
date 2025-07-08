export class Note {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string,
        public ownerId: string,
        public bannerUrl: string | null = null,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public isDeleted: boolean = false
    ) { }

    updateContent(newContent: string) {
        this.content = newContent;
        this.updatedAt = new Date();
    }

    updateTitle(newTitle: string) {
        this.title = newTitle;
        this.updatedAt = new Date();
    }

    updateBanner(newBannerUrl: string | null) {
        this.bannerUrl = newBannerUrl;
        this.updatedAt = new Date();
    }

    delete(): void {
        this.isDeleted = true;
        this.updatedAt = new Date();
    }

    restore(): void {
        this.isDeleted = false;
        this.updatedAt = new Date();
    }
}
