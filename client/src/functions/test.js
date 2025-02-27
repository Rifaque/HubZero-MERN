export const getTest = async () => {
    try {
        const res = await fetch('https://api.hubzero.in/api/test',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });

        return await res.json();
    }catch (err){}
};
