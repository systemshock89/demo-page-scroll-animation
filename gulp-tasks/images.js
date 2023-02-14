"use strict";

import { imagesType, dist, production } from "../gulpfile.js";

import pkg from 'gulp';
const {src, dest, parallel, series, watch} = pkg;
import changed from "gulp-changed";
import gulpif from "gulp-if";
import imagemin from "gulp-imagemin";
import imageminWebp from "imagemin-webp";
import webp from "gulp-webp";
import browserSync from "browser-sync";

function images1() {

    // сжимаем содержимое папки img (в случае с webp исключаем файлы svg и обрабатываем их отдельно)
    const srcImg = ['./src/img/**/*'];

    if(imagesType === 'webp'){
        srcImg.push(`!./src/img/**/*.svg`);
    }

    return src(srcImg)
        .pipe(changed(dist + "/img", gulpif(imagesType === 'webp', {extension: '.webp'}) ))
        .pipe(gulpif(imagesType === 'original', imagemin()))
        .pipe(gulpif(imagesType === 'webp',
            webp(imageminWebp({
                lossless: true,
                quality: 50,
                alphaQuality: 100
            }))))
        .pipe(dest(dist + "/img"))
        .pipe(browserSync.stream());

}

function images2() {
    if(imagesType === 'webp'){
        // svg compress
        return src('./src/img/**/*.svg')
            .pipe(changed(dist + "/img"))
            .pipe(imagemin())
            .pipe(dest(dist + "/img"))
            .pipe(browserSync.stream());
    }
}

function images3() {
    // копируем все из img/nocompress без сжатия
    return src("./src/img_nocompress/**/*")
        .pipe(changed(dist + "/img"))
        .pipe(dest(dist + "/img"))
        .pipe(browserSync.stream());
}

const images = series(images1, images2, images3);

export default images;