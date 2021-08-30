function getGraphDataSets() {

    const loadMiserables = function(Graph) {
        Graph
          .nodeLabel('id')
          .nodeAutoColorBy('group')
          .jsonUrl('.miserables.json');
    };
    loadMiserables.description = "<em>Les Miserables</em> data (<a href='https://bl.ocks.org/mbostock/4062045'>4062045</a>)";

    //

    const loadBlocks = function(Graph) {
        Graph
          .nodeLabel(node => `${node.user?node.user+': ':''}${node.description || node.id}`)
          .nodeAutoColorBy('user')
          .jsonUrl('.blocks.json');
    };
    loadBlocks.description = "<em>Blocks</em> data (<a href='https://bl.ocks.org/mbostock/afecf1ce04644ad9036ca146d2084895'>afecf1ce04644ad9036ca146d2084895</a>)";

    //

    const loadD3Dependencies = function(Graph) {
        fetch('.d3.csv').then(r => r.text()).then(d3.csvParse).then(data => {
            const nodes = [], links = [];
            data.forEach(({ size, path }) => {
                const levels = path.split('/'),
                  module = levels.length > 1 ? levels[1] : null,
                  leaf = levels.pop(),
                  parent = levels.join('/');

                nodes.push({
                    path,
                    leaf,
                    module,
                    size: +size || 1
                });

                if (parent) {
                    links.push({ source: parent, target: path});
                }
            });

            Graph
                .nodeRelSize(0.5)
                .nodeId('path')
                .nodeVal('size')
                .nodeLabel('path')
                .nodeAutoColorBy('module')
                .graphData({ nodes, links });
        });
    };
    loadD3Dependencies.description = "<em>D3 dependencies</em> data (<a href='https://bl.ocks.org/mbostock/9a8124ccde3a4e9625bc413b48f14b30'>9a8124ccde3a4e9625bc413b48f14b30</a>)";

    //

    return [loadMiserables, loadBlocks, loadD3Dependencies];
}