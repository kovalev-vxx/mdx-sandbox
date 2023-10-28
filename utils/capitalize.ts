export function capitalize(value: string): string {
    const firstLetter = value.at(0)
    if (firstLetter) {
        return firstLetter.toUpperCase() + value.slice(1)
    } else {
        return ''
    }
}

export default capitalize
