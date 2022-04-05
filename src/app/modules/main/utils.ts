export function getLocationString(locationName: string, departmentName: string): string {
  if ((!locationName) || (!departmentName)) return '';
  return `${locationName}, ${departmentName}`;
}
