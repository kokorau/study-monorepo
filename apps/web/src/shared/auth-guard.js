import { auth } from '@study-monorepo/auth';

export function setupAuthGuard() {
  // 認証が必要なページでログインしていない場合はサインインページにリダイレクト
  if (!auth.isAuthenticated()) {
    const currentPath = window.location.pathname;
    window.location.href = `/signin/?redirect=${encodeURIComponent(currentPath)}`;
    return false;
  }
  return true;
}

export function setupAuthHeader() {
  // 認証ヘッダーを動的に作成
  const authHeader = document.createElement('div');
  authHeader.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    padding: 1rem;
    background: rgba(229, 243, 255, 0.95);
    border-radius: 0 0 0 8px;
    z-index: 1000;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 0.875rem;
  `;
  
  const user = auth.getCurrentUser();
  if (user) {
    authHeader.innerHTML = `
      <span>${user.name} (${user.email})</span>
      <button id="signout-btn" style="
        margin-left: 1rem; 
        padding: 0.5rem 1rem; 
        background: #dc2626; 
        color: white; 
        border: none; 
        border-radius: 4px; 
        cursor: pointer;
        font-size: 0.75rem;
      ">Sign Out</button>
    `;
    
    document.body.appendChild(authHeader);
    
    // サインアウトボタンのイベント
    document.getElementById('signout-btn').addEventListener('click', () => {
      auth.signOut();
      window.location.href = '/signin/';
    });
  }
}