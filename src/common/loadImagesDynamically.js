import images from '../assets';

const loadImagesDynamically = (stringIcon) => {
    return images[stringIcon];
};

export default loadImagesDynamically;