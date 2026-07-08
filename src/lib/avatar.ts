export function getAvatarUrl(
  avatarUrl: string | null,
  displayName: string | null
): string {
  if (avatarUrl) return avatarUrl;

  const name = encodeURIComponent(displayName ?? "User");
  return `https://ui-avatars.com/api/?name=${name}&background=00685f&color=fff&size=128&bold=true`;
}
