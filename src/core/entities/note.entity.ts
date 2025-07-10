export class Note {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string,
        public ownerId: string,
        public bannerUrl: string | null = null,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date(),
        public isDeleted: boolean = false,
        public isFavorite: boolean = false,
        public iconUrl: string | null = null,
        public attachedFiles: string[] = [],
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

    toggleFavorite(): void {
        this.isFavorite = !this.isFavorite;
        this.updatedAt = new Date();
    }

    updateIcon(iconUrl: string | null): void {
        this.iconUrl = iconUrl;
        this.updatedAt = new Date();
    }
}
