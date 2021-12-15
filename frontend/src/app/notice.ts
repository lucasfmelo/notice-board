export interface Notice {
    id?: number,
    title? :string,
    description?: string,
    publishDate?: Date,
    visualizationDate?:Date
}

export type Notices = Array<Notice>;

