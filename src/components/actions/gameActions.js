import axiosInstance from '../../config/axios';

export const createNewMaze = (data) => {
    return new Promise((resolve, reject) => {
        axiosInstance.post("", data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export const getMazeData = (id) => {
    return new Promise((resolve, reject) => {
        axiosInstance.get(`/${id}`)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export const makeNextMove = (mazeId, direction) => {
    return new Promise((resolve, reject) => {
        axiosInstance
            .post(`/${mazeId}`, { direction })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};