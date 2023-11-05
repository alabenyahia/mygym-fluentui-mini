import { atomWithStorage } from 'jotai/utils';
import pb from '../db/pocketbase';
export const isDarkTheme = atomWithStorage('isDarkTheme', false);
export const user = atomWithStorage('pocketbase_auth', pb.authStore?.model || null);

