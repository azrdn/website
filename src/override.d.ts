// TODO: remove this file when the new types landed
declare global {
    interface Document {
        startViewTransition(options?: { 
            update: () => void; 
            types?: string[] 
        }): ViewTransition;
    }
}

export {}
