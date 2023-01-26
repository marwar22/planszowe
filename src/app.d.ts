// See https://kit.svelte.dev/docs/types#app

import type { PoolClient } from 'pg';

// for information about these interfaces
export type UserInfo = {
    username: string;
    userId: number;
    loggedIn: boolean;
};

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user?: UserInfo;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
