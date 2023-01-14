export class Version {
    static readonly empty: Version = new Version(0, 0, 0, undefined);
    static readonly versionRegex = /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)-?(?<prerelease>[a-zA-Z-\d\.]*)\+?([a-zA-Z-\d\.]*)/;

    major: number;
    minor: number;
    patch: number;
    build?: number;
    isEmpty: boolean;
    parsed: Array<number>;
    text: string;
    
    constructor(major: number, minor: number, patch: number, prerelease: number | undefined) {
        this.major = major;
        this.minor = minor;
        this.patch = patch;
        this.build = prerelease;
        this.isEmpty = !this.major && !this.minor && !this.patch && !this.build;
        this.parsed = [this.major, this.minor, this.patch, this.build].filter(item => item !== undefined);
        this.text = `${this.major}.${this.minor}.${this.patch}`
        if (this.build !== undefined) {
            this.text += `-${this.build}`
        }
    }

    static parseVersion(v: string): Version {
        const m = v.match(this.versionRegex);
        if (!m || !m.groups) {
            return Version.empty;
        }
        const groups = m.groups;
        const [major, minor, patch, prerelease] = [+groups.major, +groups.minor,
            +groups.patch, groups.prerelease ? +groups.prerelease : undefined];
        return new Version(major, minor, patch, prerelease);
    }
    
    compare(v: string | Version): number {
        if (typeof v === 'string') {
            v = Version.parseVersion(v);
        }
        for (var i = 0; i < 4; i++) {
            if (this.parsed[i] !== v.parsed[i]) {
                return this.parsed[i] > v.parsed[i] ? 1 : -1;
            }
        }
        return 0;
    }

}
