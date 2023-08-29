import { Injectable } from '@angular/core';
import interact from 'interactjs';
import $ from 'jquery';
@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  holdBeforeDrag: number = 0;
  inertia: boolean = false; //  allows drag and resize actions to continue after the user releases the pointer at a fast enough speed
  dropzoneClassName: string = 'dropzone';
  autoScroll: boolean = true; // scroll when reaching the edge of the screen while dragging

  public coordinates = {
    x: null,
    y: null,
  };
  min;

  validTargets = [];
  public drag_pos = { x: 0, y: 0 };
  constructor() {}

  public init() {
    interact('.dropzone').dropzone({
      accept: '.drag-drop',


    })
    interact('.drag-drop')
      .draggable({
        allowFrom:'.drag-handle',
        inertia: true,
        onmove: function (event) {
          var target = event.target;
          var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
          var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        },
        onend: function (event) {
          console.log(event);
        },

      })
      .on('move', function (event) {
        var interaction = event.interaction;
        if (
          interaction.pointerIsDown &&
          !interaction.interacting() &&
          event.currentTarget.getAttribute('clonable') != 'false'
        ) {
          var original = event.currentTarget;
          var clone = event.currentTarget.cloneNode(true);
          var x = clone.offsetLeft;
          var y = clone.offsetTop;
          clone.setAttribute('clonable', 'false');
          clone.style.position = 'absolute';
          clone.style.left = original.offsetLeft + 'px';
          clone.style.top = original.offsetTop + 'px';
          original.parentElement.appendChild(clone);
          interaction.start({ name: 'drag' }, event.interactable, clone);
        }
      });
  }

  showCoordinates() {
    var _valid = [];
    var _invalid = [];
    //get all valid placeholders
    $('.drag-drop.can-drop').each(function (index) {
      var x = parseFloat($(this).attr('final-data-x'));
      var y = parseFloat($(this).attr('final-data-y'));
      var email = $(this).html();
      var pageNumber = parseInt($(this).attr('pagenumber'));
      var val = {
        // email: email,
        X: x * 1.33 + 24,
        Y: y * 1.33 + 24,
        pageNumber: pageNumber - 1,
      };
      _valid.push(val);
    });
    return _valid;
  }
}
