export interface NationData {
    flags: nationFlags;
    name: nationName;
}

export interface nationFlags {
    png: string;
    svg: string;
}

export interface nationName {
    common: string;
    official: string;
    nativeName: any;
}

