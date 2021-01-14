/*chart = {
	const svg = d3.create("svg")
		.attr("viewBox", [0, 0, width, height]);

	svg.append("g")
	.attr("fill", "steelblue")
	.selectAll("rect")
	.data(bins)
	.join("rect")
	.attr("x", d => x(d.x0) + 1)
	.attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
	.attr("y", d => y(d.length))
	.attr("height", d => y(0) - y(d.length));

	svg.append("g")
	.call(xAxis);

	svg.append("g")
	.call(yAxis);

	return svg.node();
}
*/
option = {
    title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [{
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};