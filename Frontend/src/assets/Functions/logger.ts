export default (...message: any[]) => {
    if (import.meta.env.DEV){
        console.log(...message)
    }
}