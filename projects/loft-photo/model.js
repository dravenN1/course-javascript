import { rejects } from "assert";
import { resolve } from "path";

export default {
  getRandomElement(array) {
    if (!array.length){
      return null;
    }

    const index = parseInt(Math.random() * (array.length - 1));

    return array[index];
  },
  

  login(){
    return new Promise((resolve , reject) => {

      VK.init({
        apiID: 51645546,
      });

      VK.Auth.login(response => {
        if(response.session){
          resolve();
        } else {
          reject(new Error ('Не удалось авторизоваться'));
        }
      })
    })
  },

  async init() {
    this.photoCache = {};
    this.friends = await this.getFriends();
  },

  async getFriends() {
    const params = {
      fields: ['photo_50','photo_100'],
    };

    return this.callApi('friends.get', params);
  },

  async callApi(method, params){
    params.v = params.v || '5.120';

    return new Promise ((resolve , reject) => {
      VK.api(method, params, (response) =>{
        if (response.error) {
          reject (new Error(response.error.error_msg));
        } else {
          resolve(response.response);
        }
      })
    })
  },

  async getPhotos(owner){
    const params = {
      owner_id: owner,
    };

    return this.callApi('photos.getAll', params);
  },

  photoCache: {},
  async getFriendPhotos(id) {
    const photos = this.photoCache[id];
  
    if (photos) {
      return photos;
    }
  
    photos = await this.photoCache[id];

    this.photoCache[id] = photos;
  
    return photos;
  },
    async getNextPhoto() {
      const friend = this.getRandomElement(this.friends.items);
      const photos = await this.getFriendPhotos(friend.id);
      const photo = this.getRandomElement(photos.items);
      const size = this.findSize(photo);

      return {friend, id: photo.id, url: photo.url};
    },

    async findSize(photo) {
      const size = photo.sizes.find((size) => size.width >= 360);

      if (!size) {
        return photo.sizes.reduce((biggest, current) => {
          if(current.width > biggest.width){
            return current;
          }

          return biggest;
        }, photo.sizes[0]);
      } return size;
    }
};