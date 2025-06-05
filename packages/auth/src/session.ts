import type { UserEntity, AuthStateValue, SessionConfig } from './types'

const STORAGE_KEY = 'study-monorepo-auth-session'
const DEFAULT_SESSION_TIMEOUT = 30 // 30分

export const $Session = {
  config: {
    sessionTimeoutMinutes: DEFAULT_SESSION_TIMEOUT
  } as SessionConfig,

  save(user: UserEntity): void {
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + this.config.sessionTimeoutMinutes)
    
    const authState: AuthStateValue = {
      isAuthenticated: true,
      user,
      expiresAt
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState))
  },

  load(): AuthStateValue {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        return this.createEmptyState()
      }

      const parsed = JSON.parse(stored) as AuthStateValue
      const expiresAt = new Date(parsed.expiresAt!)
      
      // セッション期限切れチェック
      if (expiresAt <= new Date()) {
        this.clear()
        return this.createEmptyState()
      }

      return {
        ...parsed,
        expiresAt
      }
    } catch {
      this.clear()
      return this.createEmptyState()
    }
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY)
  },

  isExpired(): boolean {
    const state = this.load()
    return !state.isAuthenticated || !state.expiresAt || state.expiresAt <= new Date()
  },

  getRemainingTime(): number {
    const state = this.load()
    if (!state.expiresAt) return 0
    return Math.max(0, state.expiresAt.getTime() - Date.now())
  },

  createEmptyState(): AuthStateValue {
    return {
      isAuthenticated: false,
      user: null,
      expiresAt: null
    }
  }
}