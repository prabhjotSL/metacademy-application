
// FIXME TODO - must return errors to the user in an elegant way, both client side (here) and from the server

/*global define*/
define(["backbone", "underscore", "jquery"], function(Backbone, _, $){
  return  (function(){

    var pvt = {};
    pvt.consts = {
      ecClass: "expanded"
    };

    return Backbone.View.extend({

      events: function(){
      // TODO why are some of these events firing twice?
        return {
          "blur .text-field": "blurTextField",
          "change .boolean-field": "changeBooleanField",
          "change .select-field": "changeSelectField",
          /*"blur .composite-field": "changeCompositeField",*/
          "click .ec-button": "toggleEC"
        };
      },

      /**
       * render the view and return the view element
       */
      render: function(){
        throw "must implement render in sub'class'";
      },

      /**
       * Assign subviews: method groked from http://ianstormtaylor.com/assigning-backbone-subviews-made-even-cleaner/
       */
      assign : function (selector, view) {
        var selectors;
        if (_.isObject(selector)) {
          selectors = selector;
        }
        else {
          selectors = {};
          selectors[selector] = view;
        }
        if (!selectors) return;
        _.each(selectors, function (view, selector) {
          view.setElement(this.$(selector)).render();
        }, this);
      },

      /**
       * Expand/contract the resource fields
       */
      toggleEC: function (evt) {
        $(evt.currentTarget.parentElement).toggleClass(pvt.consts.ecClass);
      },

      /**
       * blurTextField: change text field in the resource model
       */
      blurTextField: function (evt) {
        var thisView = this,
            curTar = evt.currentTarget,
            attrName = curTar.name.split("-")[0];
        thisView.model.set(attrName, curTar.value);
      },

      // /**
      //  * changeCompositeField: change composite (text + url in brackets)
      //  * field in the resource model
      //  */
      // changeCompositeField: function (evt) {
      //   var thisView = this,
      //       curTar = evt.currentTarget,
      //       attrName = curTar.name.split("-")[0],
      //       inpText = curTar.value;
      //   thisView.model.set(attrName, pvt.parseCompositeField(inpText));
      // },

      /**
       * changeBooleanField: change boolean field in the resource model
       */
      changeBooleanField: function (evt) {
        var thisView = this,
            curTar = evt.currentTarget,
            attrName = curTar.name.split("-")[0];
        thisView.model.set(attrName, curTar.checked ? 1 : 0);
      },

      /**
       * changeSelectField: change core/supplementary field in the resource model
       */
      changeSelectField: function (evt) {
        var thisView = this,
            curTar = evt.currentTarget,
            attrName = curTar.name.split("-")[0];
        thisView.model.set(attrName, curTar.value);
      }
    });
  })();
});
