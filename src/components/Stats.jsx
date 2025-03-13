import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TransactionContext } from '../context/TransactionContext';

const Stats = () => {
  const svgRef = useRef();
  const { transactions } = useContext(TransactionContext);

  useEffect(() => {
    const amounts = transactions.map(t => t.amount);
    const income = amounts.filter(a => a > 0).reduce((acc, cur) => acc + cur, 0);
    const expense = Math.abs(
      amounts.filter(a => a < 0).reduce((acc, cur) => acc + cur, 0)
    );

    const data = [
      { label: 'Income', value: income },
      { label: 'Expense', value: expense },
    ];

    const width = 300;
    const height = 300;
    const margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pie = d3.pie().value(d => d.value);
    const data_ready = pie(data);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const color = d3
      .scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

    svg
      .selectAll('path')
      .data(data_ready)
      .join('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', 'white')
      .style('stroke-width', '2px')
      .style('opacity', 0.7);

    svg
      .selectAll('text')
      .data(data_ready)
      .join('text')
      .text(d => `${d.data.label}: ${d.data.value.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} COP`)
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', 12);
  }, [transactions]);

  return (
    <div className="flexCentered">
      <h1>Expense Statistics</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Stats;
