export class Version {
  static readonly empty: Version = new Version(0, 0, 0, undefined)

  static readonly versionRegex = /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?<prereleasetype>[abf])(?<prereleasenumber>\d+)?/;

  major: number
  minor: number
  patch: number
  prereleasetype?:string
  prereleasenumber?: number
  isEmpty: boolean
  parsed: Array<number>
  text: string
  hash: number

  constructor(major: number, minor: number, patch: number, prereleasetype?: string | undefined, prereleasenumber?: number | undefined) {
    this.major = major
    this.minor = minor
    this.patch = patch
    this.prereleasetype = prereleasetype;
    this.prereleasenumber = prereleasenumber
    this.isEmpty = !this.major && !this.minor && !this.patch && !this.prereleasenumber

    var release:number | undefined = undefined;
    if (prereleasetype && prereleasenumber) {
      var prereleaseCode = prereleasetype.charCodeAt(0) * 13; //String.fromCharCode(97 + prereleasetype as string);
      release = prereleaseCode * prereleasenumber
    }

    this.parsed = [
      this.major,
      this.minor,
      this.patch,
      release ?? 0
    ].filter((item) => item !== undefined)
    
    this.text = `${this.major}.${this.minor}.${this.patch}`
    
    if (prereleasetype && prereleasenumber) {
      this.text += `${prereleasetype}${prereleasenumber}`
    }
    this.hash = this.createHash()
  }

  static parseVersion(v: string): Version {
    const m = v.match(this.versionRegex)

    if (!m || !m.groups) {
      return Version.empty
    }
    const { groups } = m
    const [
      major,
      minor,
      patch,
      prereleasetype,
      prereleasenumber
    ] = [
        Number(groups.major),
        Number(groups.minor),
        Number(groups.patch),
        groups.prereleasetype
          ? String(groups.prereleasetype)
          : undefined,
        groups.prereleasenumber
          ? Number(groups.prereleasenumber)
          : undefined
      ]

    return new Version(major, minor, patch, prereleasetype, prereleasenumber)
  }

  compare(v: string | Version): number {
    if (typeof v === 'string') {
      v = Version.parseVersion(v)
    }
    for (let i = 0; i < 4; i++) {
      if (this.parsed[i] !== v.parsed[i]) {
        return this.parsed[i] > v.parsed[i]
          ? 1
          : -1
      }
    }

    return 0
  }

  createHash(): number {
    return this.major * 100000000 + this.minor * 1000000 + this.patch * 10000 + (this.prereleasenumber! + 1 || 0)
  }

}
