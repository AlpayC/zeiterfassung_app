import * as GoIcons from "react-icons/go";

export const iconMap = {
  ...GoIcons,
};

export function getIconComponent(icon) {
  const IconComponent = iconMap[icon];
  return IconComponent ? <IconComponent /> : null;
}
export function getAllIcons() {
  return Object.values(iconMap);
}
