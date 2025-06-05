import type { UserEntity, AuthStateValue } from './types'
import { $Session } from './session'

export const $Auth = {
  signIn(email: string, password: string): Promise<UserEntity> {
    return new Promise((resolve, reject) => {
      // 簡易認証: パスワードが6文字以上で有効なemailなら成功
      setTimeout(() => {
        if (!email.includes('@') || password.length < 6) {
          reject(new Error('Invalid email or password (password must be 6+ characters)'))
          return
        }

        const user: UserEntity = {
          id: `user_${Date.now()}`,
          email,
          name: email.split('@')[0], // emailのlocal partを名前として使用
          authenticatedAt: new Date()
        }

        $Session.save(user)
        resolve(user)
      }, 500) // リアルっぽい遅延
    })
  },

  signOut(): void {
    $Session.clear()
  },

  getCurrentUser(): UserEntity | null {
    const state = $Session.load()
    return state.user
  },

  isAuthenticated(): boolean {
    const state = $Session.load()
    return state.isAuthenticated && !$Session.isExpired()
  },

  getAuthState(): AuthStateValue {
    return $Session.load()
  },

  // セッション延長
  extendSession(): boolean {
    const currentUser = this.getCurrentUser()
    if (!currentUser || this.isAuthenticated() === false) {
      return false
    }
    
    $Session.save(currentUser)
    return true
  },

  // セッション残り時間（ミリ秒）
  getRemainingTime(): number {
    return $Session.getRemainingTime()
  }
}