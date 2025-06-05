export interface UserEntity {
  readonly id: string
  readonly email: string
  readonly name: string
  readonly authenticatedAt: Date
}

export interface AuthStateValue {
  readonly isAuthenticated: boolean
  readonly user: UserEntity | null
  readonly expiresAt: Date | null
}

export interface SessionConfig {
  readonly sessionTimeoutMinutes: number
}