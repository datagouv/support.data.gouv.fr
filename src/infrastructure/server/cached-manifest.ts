import * as fs from "fs";
import * as path from "path";

class CachedManifest {
    private manifest: { "main.js": string; "main.css": string } | undefined;

    get mainJs(): string | undefined {
        if (this.manifest) {
            return this.manifest["main.js"];
        }
        this.readManifest();
    }

    get mainCss(): string | undefined {
        if (this.manifest) {
            return this.manifest["main.css"];
        }
        this.readManifest();
    }

    private readManifest() {
        try {
            this.manifest = JSON.parse(
                fs.readFileSync(
                    path.resolve(
                        process.cwd(),
                        "public",
                        "dist",
                        "manifest.json"
                    ),
                    "utf-8"
                )
            );
        } catch (err) {
            console.log(
                "Trying to load application before frontent assets build finished..."
            );
        }
    }
}

export const cachedManifest = new CachedManifest();
