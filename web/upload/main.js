// 执行初始化的函数
;(function($w){
    'use strict';
    var __name__ = 'upload';
    // library version
    var __version__ = '0.5.0';
    // author
    var __author__ = '1461685273@qq.com';

    // an noop function define
    var _noop = function () { };
    var logger = (typeof console === 'undefined') ? {
        log: _noop, debug: _noop, error: _noop, warn: _noop, info: _noop
    } : console;

    // check global variables
    if (typeof module === 'undefined' || !module.exports) {
        if (typeof $w[__name__] != 'undefined') {
            logger.log(__name__ + ' has been already exist.');
            return;
        }
    }

    var $h = function (n, t) {
        if (t instanceof HTMLElement) {
            n.innerHTML = '';
            n.appendChild(t)
        } else {
            n.innerHTML = t;
        }
    };

    var upload = function(options){

        upload.current = this;

        this.version = __version__;

        this.name = __name__;

        this.dropFiles = [];  // 拖拽的文件存放位置

        this.options = {

            name: "苏氏之道",

            duanwei: "内力七级"
        }

        this.init();
    }

    // 静态的工具方法只能是构造函数点使用，new出来的对象不能调用
    upload.util = {

        ajax: {
            _xhr: function () {
                var xhr = null;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else {
                    try {
                        xhr = new ActiveXObject('Microsoft.XMLHTTP');
                    } catch (e) { }
                }
                return xhr;
            },

            _eurl: function (url) {
                return encodeURIComponent(url);
            },

            request: function (url, param, method, callback, fail_callback) {
                var a = jm.util.ajax;
                var p = null;
                var tmp_param = [];
                for (var k in param) {
                    tmp_param.push(a._eurl(k) + '=' + a._eurl(param[k]));
                }
                if (tmp_param.length > 0) {
                    p = tmp_param.join('&');
                }
                var xhr = a._xhr();
                if (!xhr) { return; }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200 || xhr.status == 0) {
                            if (typeof callback === 'function') {
                                var data = jm.util.json.string2json(xhr.responseText);
                                if (data != null) {
                                    callback(data);
                                } else {
                                    callback(xhr.responseText);
                                }
                            }
                        } else {
                            if (typeof fail_callback === 'function') {
                                fail_callback(xhr);
                            } else {
                                logger.error('xhr request failed.', xhr);
                            }
                        }
                    }
                }
                method = method || 'GET';
                xhr.open(method, url, true);
                xhr.setRequestHeader('If-Modified-Since', '0');
                if (method == 'POST') {
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
                    xhr.send(p);
                } else {
                    xhr.send();
                }
            },

            get: function (url, callback) {
                return jm.util.ajax.request(url, {}, 'GET', callback);
            },

            post: function (url, param, callback) {
                return jm.util.ajax.request(url, param, 'POST', callback);
            }
        },

        json: {
            json2string: function (json) {
                if (!!JSON) {
                    try {
                        var json_str = JSON.stringify(json);
                        return json_str;
                    } catch (e) {
                        logger.warn(e);
                        logger.warn('can not convert to string');
                        return null;
                    }
                }
            },
            string2json: function (json_str) {
                if (!!JSON) {
                    try {
                        var json = JSON.parse(json_str);
                        return json;
                    } catch (e) {
                        logger.warn(e);
                        logger.warn('can not parse to json');
                        return null;
                    }
                }
            },
            merge: function (b, a) {
                for (var o in a) {
                    if (o in b) {
                        if (typeof b[o] === 'object' &&
                            Object.prototype.toString.call(b[o]).toLowerCase() == '[object object]' &&
                            !b[o].length) {
                            jm.util.json.merge(b[o], a[o]);
                        } else {
                            b[o] = a[o];
                        }
                    } else {
                        b[o] = a[o];
                    }
                }
                return b;
            }
        },

        uuid: {
            newid: function () {
                return (new Date().getTime().toString(16) + Math.random().toString(16).substr(2)).substr(2, 16);
            }
        },

        text: {
            is_empty: function (s) {
                if (!s) { return true; }
                return s.replace(/\s*/, '').length == 0;
            }
        },
        // 获得拖拽文件的回调函数
       drop: {
            getDropFileCallBack: function(dropFiles) {
                console.log(dropFiles, dropFiles.length);
            }
       }

    }

    // 原型对象添加方法
    upload.prototype = {

        init: function(){

            if (this.inited) { return; }

            this.inited = true;

            var opts = this.options;

        },

        getUUid: function(){
            return upload.util.uuid.newid();
        },

        // 设置拖拽区域
        dropSet: function() {

            var dropZone = document.querySelector("#drop-box");
            var _this = this;
            dropZone.addEventListener("dragenter", function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);

            dropZone.addEventListener("dragover", function (e) {
                e.dataTransfer.dropEffect = 'copy'; // 兼容某些三方应用，如圈点
                e.preventDefault();
                e.stopPropagation();
            }, false);

            dropZone.addEventListener("dragleave", function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);

            dropZone.addEventListener("drop", function (e) {
                e.preventDefault();
                e.stopPropagation();

                var df = e.dataTransfer;
                _this.dropFiles = [];                 // 拖拽的文件，会放到这里
                var dealFileCnt = 0;                // 读取文件是个异步的过程，需要记录处理了多少个文件了
                var allFileLen = df.files.length;    // 所有的文件的数量，给非Chrome浏览器使用的变量

                // 检测是否已经把所有的文件都遍历过了
                var checkDropFinish = function () {
                    if ( dealFileCnt === allFileLen-1 ) {
                        getDropFileCallBack(_this.dropFiles);
                    }
                    dealFileCnt++;
                }

                if(df.items !== undefined){
                    // Chrome拖拽文件逻辑
                    for(var i = 0; i < df.items.length; i++) {
                        var item = df.items[i];
                        if(item.kind === "file" && item.webkitGetAsEntry().isFile) {
                            var file = item.getAsFile();
                            _this.dropFiles.push(file);
                            $h(dropZone, file.name);
                            dropZone.style.color = "red";
                            // console.log(file);
                        }
                    }
                } else {
                    console.log('非chrome')
                    // 非Chrome拖拽文件逻辑
                    for(var i = 0; i < allFileLen; i++) {
                        var dropFile = df.files[i];
                        if ( dropFile.type ) {
                            _this.dropFiles.push(dropFile);
                            $h(dropZone, file.name);
                            dropZone.style.color = "red";
                            checkDropFinish();
                        } else {
                            try {
                                var fileReader = new FileReader();
                                fileReader.readAsDataURL(dropFile.slice(0, 3));

                                fileReader.addEventListener('load', function (e) {
                                    console.log(e, 'load');
                                    _this.dropFiles.push(dropFile);
                                    checkDropFinish();
                                }, false);

                                fileReader.addEventListener('error', function (e) {
                                    console.log(e, 'error，不可以上传文件夹');
                                    checkDropFinish();
                                }, false);

                            } catch (e) {
                                console.log(e, 'catch error，不可以上传文件夹');
                                checkDropFinish();
                            }
                        }
                    }
                }
            }, false);
        },

        // 是否存在drop的文件
        isHaveDropfile() {
            if (this.dropFiles.length > 0) {
                return true;
            } else return false;
        },

        // 获取拖拽的文件
        getDropFile() {
            let file = null;
            if (this.isHaveDropfile()) {
                file = this.dropFiles[0]
            }
            return file;
        },

        // 将file文件转为hash值
        createFileHas(file) {
            var fileReader = new FileReader();
            var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;
            var bloceSize = 1024;
            var blocks = Math.ceil(file.size / bloceSize);
            var currentBlock = 0; // 记录当前已经运行的块数；
            // var fileSHA256 = CryptoJS.algo.SHA256.create(); // 创建一个对象
            var start = 0;
            var end = start + bloceSize >= file.size ? file.size : start + bloceSize;
        },

        // 将文件或blob转为base64
        fileToBlob (data){
            return new Promise((resolve,reject)=> {
                var reader = new FileReader();
                reader.onload = function(e){
                    return resolve(e.target.result);
                }
                reader.onerror = (e) => {
                    return reject(e.target.result);
                };
                reader.readAsDataURL(data);
            })
        },

        /**
         * 将base64转换为文件
         * @param base64     base64字符串
         * @param type       mime类型
         */
        base64ToBlob (base64 , type) {
            const arr = base64.split(',');
            const mime = arr[0].match(/:(.*?);/)[1] || type;
            // 去掉url的头，并转化为byte
            const bytes = window.atob(arr[1]);
            // 处理异常,将ascii码小于0的转换为大于0
            const ab = new ArrayBuffer(bytes.length);
            // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
            const ia = new Uint8Array(ab);
            for (let i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }
            return new Blob([ab], { type : mime });
        },

        /**
         * base64转换为文件
         * @param base64
         * @param filename
         */
        base64ToFile (base64 , filename ) {
            const array = base64.split(',');
            const mime = array[0].match(/:(.*?);/)[1];
            const str = window.atob(array[1]);
            let length = str.length;
            const uint8Array = new Uint8Array(length);
            while (length--) {
                uint8Array[length] = str.charCodeAt(length);
            }
            return new File([uint8Array], filename, { type : mime });
        },

        createFileChunk(file, size){
            // ⽣生成⽂文件块
            const chunks = [];
            let cur = 0;
            while (cur < file.size) {
                // if(file.size - cur > size) size = file.size - cur;
                chunks.push({ file: file.slice(cur, cur + size) }); // 切割起点、切割终止点
                cur += size;
            }
            return chunks;
            
        }


    }



    // quick way
    upload.use = function (options, m) {

        var _upload = new upload(options);
            // 执行设置可拖拽区域
            _upload.dropSet();

        return _upload;
    };

    // export upload
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = upload;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(function () { return upload; });
    } else {
        $w[__name__] = upload;
    }

})(typeof window !== 'undefined' ? window : global);