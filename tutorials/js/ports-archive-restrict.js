(function() {

    var namespace = joint.shapes;
    var graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    new joint.dia.Paper({
        el: $('#paper-restrict'),
        width: 650, height: 200, gridSize: 1,
        model: graph,
        cellViewNamespace: namespace,
        defaultLink: () => new joint.dia.Link({
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }}
        }),
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
        // Prevent linking from input ports.
            if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
            // Prevent linking from output ports to input ports within one element.
            if (cellViewS === cellViewT) return false;
            // Prevent linking to input ports.
            return magnetT && magnetT.getAttribute('port-group') === 'in';
        },
        validateMagnet: function(cellView, magnet) {
        // Note that this is the default behaviour. Just showing it here for reference.
        // Disable linking interaction for magnets marked as passive (see below `.inPorts circle`).
            return magnet.getAttribute('magnet') !== 'passive';
        }
    });

    var m1 = new joint.shapes.devs.Model({
        position: { x: 50, y: 50 },
        size: { width: 90, height: 90 },
        inPorts: ['in1','in2'],
        outPorts: ['out'],
        ports: {
            groups: {
                'in': {
                    attrs: {
                        '.port-body': {
                            fill: '#16A085',
                            magnet: 'passive'
                        }
                    }
                },
                'out': {
                    attrs: {
                        '.port-body': {
                            fill: '#E74C3C'
                        }
                    }
                }
            }
        },
        attrs: {
            '.label': { text: 'Model', x: 0, y: 'calc(0.2*h)' },
            rect: { fill: '#2ECC71' }
        }
    });
    graph.addCell(m1);

    var m2 = m1.clone();
    m2.translate(300, 0);
    graph.addCell(m2);
    m2.attr('.label/text', 'Model 2');

}());
