// /*global window,location*/
// (function (window) {
//   'use strict';

//   var Simditor = window.Simditor;
//   var directives = angular.module('simditor',[]);

//   directives.directive('simditor', function () {
//     return {
//       require: "?^ngModel",
//       link: function (scope, element, attrs, ngModel) {
//         element.append("<div style='height:500px;'></div>");

//         console.log(0);

//         scope.simditor = new Simditor({
//           textarea: element.children()[0],
//           pasteImage: true,
//           toolbar: ["title","bold","italic","underline","strikethrough","color","|","ol","ul","blockquote","code","table","|","link","image","hr","|","indent","outdent","alignment","|","html"],
//           defaultImage: 'assets/images/image.png',
//           upload: location.search === '?upload' ? {
//             url: '/upload'
//           } : false
//         });

//         function readViewText() {
//           var html = element.find('.simditor-body').html();
//           // When we clear the content editable the browser leaves a <br> behind
//           // If strip-br attribute is provided then we strip this out
//           if (attrs.stripBr && html === '<br>') {
//             html = '';
//           }

//           ngModel.$setViewValue(html);
//         }

//         var $target = element.find('.simditor-body');

//         ngModel.$render = function () {
//           scope.simditor.focus();
//           $target.prepend(ngModel.$viewValue);
//         };

//         element.on('blur keyup change', function () {
//           scope.$apply(readViewText);
//         });
//       }
//     };
//   });
// }(window));


(function() {
    "use strict";
    ! function() {
        var ngSimditor = angular.module("angular-simditor", []);
        ngSimditor.constant("simditorConfig", {
       
            toolbar: ["title", "bold", "italic", "underline", "strikethrough", "color", "|", "ol", "ul", "blockquote", "code", "table", "|", "link", "image", "hr", "|", "indent", "outdent", "alignment", "|", "html"],
            pasteImage: !0,
            defaultImage: "",
            upload: {
                url: "/upload"
            },
            allowedTags: ["br", "a", "img", "b", "strong", "i", "u", "font", "p", "ul", "ol", "li", "blockquote", "pre", "h1", "h2", "h3", "h4", "hr", "div", "script", "style"]
        }), ngSimditor.directive("ngSimditor", ["$timeout", "simditorConfig", function($timeout, simditorConfig) {
            return {
                scope: {
                    content: "="
                },
                restrict: "E",
                template: '<textarea data-autosave="editor-content" autofocus></textarea>',
                replace: !0,
                link: function($scope, iElm, iAttrs, controller) {
                    var editor = new Simditor(angular.extend({
                            textarea: iElm
                        }, simditorConfig)),
                        nowContent = "";
                    $scope.$watch("content", function(value, old) {
                        "undefined" != typeof value && value != nowContent && editor.setValue(value)
                    }), editor.on("valuechanged", function(e) {
                        $scope.content != editor.getValue() && $timeout(function() {
                            $scope.content = nowContent = editor.getValue()
                        })
                    })
                }
            }
        }])
    }()
}).call(this), angular.module("ghostapp", ["angular-simditor"]).config(["simditorConfig", function(simditorConfig) {
    simditorConfig.placeholder = ""
}]).controller("TestCtrl", ["$scope", function($scope) {
    $scope.test = "test content"
}]);