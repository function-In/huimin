import axios from "axios";
axios.defaults.withCredentials = true;


// 定义后台API地址
const address = 'http://localhost:99';

const Post = (files, data, result, catchs) => {
    const formData = new FormData();
    // 文件添加
    if (files) {
        for (const key in files) {
            if (Object.hasOwnProperty.call(files, key)) { formData.append('file' + key, files[key]); }
        }
    }
    // 数据添加
    if (data) for (const item of data) formData.append(item.name, item.value);
    // 定义接口地址
    return axios.post(address + '/api/', formData,
        {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    ).then(result ? result : undefined).catch(catchs ? catchs : undefined);
}

export default { Post, address }