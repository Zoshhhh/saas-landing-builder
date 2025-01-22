declare module "archiver" {
    import type { Readable } from "stream"

    namespace archiver {
        interface Archiver extends Readable {
            pipe(stream: NodeJS.WritableStream): this
            append(source: string | Buffer | Readable, name?: string | { name: string }): this
            directory(dirpath: string, destpath: string): this
            finalize(): Promise<void>
            on(event: string, listener: (...args: any[]) => void): this
        }

        interface ArchiverOptions {
            zlib?: {
                level: number
            }
        }

        function create(format: string, options?: ArchiverOptions): Archiver
    }

    function archiver(format: string, options?: archiver.ArchiverOptions): archiver.Archiver

    export = archiver
}

