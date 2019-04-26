export function apiUrl(path) {
	return 'https://jsonplaceholder.typicode.com/' + (path.startsWith('/') ? path.substring(1) : path);
}