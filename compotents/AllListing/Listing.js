const useListings = () => {
  const getById = async (id) => {
    try {
        const userFavIds = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/fetchbyid`,
            {
              method: "POST",
              body: JSON.stringify({
                id: id,
                secret: "thiswillbekailashloginsystem",
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          );
          const res = await userFavIds.json()
          return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
  };
  return { getById };
};

export default useListings;
