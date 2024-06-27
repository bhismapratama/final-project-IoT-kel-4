enum PermissionEnum {
  'all',
  'authed',
}

export type PermissionList = Array<keyof typeof PermissionEnum>;
