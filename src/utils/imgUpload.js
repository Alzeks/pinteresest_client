import ImageKit from 'imagekit';

export const imgkitUpload = async (formData, file) => {
    formData.append('file', file)

    const imagekit = new ImageKit({
        publicKey: 'public_Zu1t0/gyCG9uFIqIpAduzHeO6Rk=',
        privateKey: 'private_hiOUGJ4T/LsGlsq8IsXmt3ddEuY=',
        urlEndpoint: 'https://ik.imagekit.io/ica25imdrn',
    });

    const imgUrl = await imagekit.upload({
        file: file,
        fileName: file.name,
        folder: 'pins'
    }).catch((res) => setError(res))
    console.log(imgUrl);

    return await imgUrl.filePath
}