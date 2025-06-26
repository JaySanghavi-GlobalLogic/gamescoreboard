    // import React from 'react';
    // import GraphComponent from './GraphComponent';

    // interface XBarRDatum {
    //     time: string;
    //     mean: number;
    //     range: number;
    // }

    // interface XBarStats {
    //     USL: number;
    //     LSL: number;
    //     mean: number;
    //     sigma: number;
    // }

    // interface RChartStats {
    //     UCL: number;
    //     LCL: number;
    //     mean: number;
    // }

    // interface Props {
    //     xBarRData: XBarRDatum[];
    //     xBarStats: XBarStats;
    //     rChartStats: RChartStats;
    // }

    // const XBarChart: React.FC<Props> = ({ xBarRData, xBarStats }) => {
    //     const labels = xBarRData.map((d) => d.time);

    //     const allValues = [
    //         ...xBarRData.map((d) => d.mean),
    //         xBarStats.mean,
    //         xBarStats.USL,
    //         xBarStats.LSL,
    //       ];
          
    //       const yMin = Math.min(...allValues) * 0.95; // Add 5% padding below
    //       const yMax = Math.max(...allValues) * 1.05; // Add 5% padding above

    //     const xBarChartData = {
    //         labels,
    //         datasets: [
    //             {
    //                 label: 'Mean',
    //                 data: xBarRData.map((d) => d.mean),
    //                 borderColor: 'black',
    //                 borderWidth: 3,
    //                 fill: false,
    //                 tension: 0.3,
    //                 type: 'line' as const,
    //             },
    //             {
    //                 label: 'Mean (Center)',
    //                 data: xBarRData.map(() => xBarStats.mean),
    //                 borderColor: '#4caf50',
    //                 borderDash: [5, 5],
    //                 borderWidth: 2,
    //                 pointRadius: 0,
    //                 fill: false,
    //                 type: 'line' as const,
    //             },
    //             {
    //                 label: 'USL',
    //                 data: xBarRData.map(() => xBarStats.USL),
    //                 borderColor: '#f44336',
    //                 borderDash: [5, 5],
    //                 borderWidth: 2,
    //                 pointRadius: 0,
    //                 fill: false,
    //                 type: 'line' as const,
    //             },
    //             {
    //                 label: 'LSL',
    //                 data: xBarRData.map(() => xBarStats.LSL),
    //                 borderColor: '#f44336',
    //                 borderDash: [5, 5],
    //                 borderWidth: 2,
    //                 pointRadius: 0,
    //                 fill: false,
    //                 type: 'line' as const,
    //             },
    //         ],
    //     };

    //     const xBarChartOptions = {
    //         responsive: true,
    //         plugins: {
    //             legend: { position: 'top' as const },
    //             tooltip: { mode: 'index' as const, intersect: false },
    //             title: {
    //                 display: true,
    //                 text: 'X̄ Chart (Mean)',
    //                 font: { size: 18 },
    //             },
    //         },
    //         scales: {
    //             y: {
    //                 min: yMin,
    //                 max: yMax,
    //             },
    //         },
    //     };

    //     return (
    //         <>
    //             <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
    //                 <GraphComponent type="line" data={xBarChartData} options={xBarChartOptions} height={300} width={900} />
    //                 <div className="bg-white rounded-lg p-6 shadow">
    //                     <h3 className="font-semibold mb-2">Specifications</h3>
    //                     <div className="space-y-1">
    //                         <div><span className="font-medium">USL:</span> {xBarStats.USL}</div>
    //                         <div><span className="font-medium">LSL:</span> {xBarStats.LSL}</div>
    //                         <div><span className="font-medium">Mean:</span> {xBarStats.mean}</div>
    //                         <div><span className="font-medium">σ:</span> {xBarStats.sigma}</div>
    //                     </div>
    //                     <hr className="my-3" />
    //                     <h3 className="font-semibold mb-2">Legend</h3>
    //                     <div className="flex items-center space-x-2 text-xs"><span className="w-4 h-1 bg-black inline-block rounded"></span><span>X̄</span></div>
    //                     <div className="flex items-center space-x-2 text-xs"><span className="w-4 h-1 bg-green-600 border-dashed inline-block rounded"></span><span>Mean</span></div>
    //                     <div className="flex items-center space-x-2 text-xs"><span className="w-4 h-1 bg-red-600 border-dashed inline-block rounded"></span><span>USL / LSL</span></div>
    //                 </div>
    //             </div>
    //         </>
    //     );
    // };

    // export default XBarChart;
    import React from 'react';
    import GraphComponent from './GraphComponent';
    
    interface XBarRDatum {
      time: string;
      mean: number;
      range: number;
    }
    
    interface XBarStats {
      USL: number;
      LSL: number;
      mean: number;
      sigma: number;
    }
    
    interface RChartStats {
      UCL: number;
      LCL: number;
      mean: number;
    }
    
    interface Props {
      xBarRData: XBarRDatum[];
      xBarStats: XBarStats;
      rChartStats: RChartStats;
    }
    
    const XBarChart: React.FC<Props> = ({ xBarRData, xBarStats }) => {
      const labels = xBarRData.map((d) => d.time);
    
      const allValues = [
        ...xBarRData.map((d) => d.mean),
        xBarStats.mean,
        xBarStats.USL,
        xBarStats.LSL,
      ];
    
      const yMin = Math.min(...allValues) * 0.95;
      const yMax = Math.max(...allValues) * 1.05;
    
      const xBarChartData = {
        labels,
        datasets: [
          {
            label: 'Mean',
            data: xBarRData.map((d) => d.mean),
            borderColor: 'black',
            borderWidth: 3,
            fill: false,
            tension: 0.3,
            type: 'line' as const,
          },
          {
            label: 'Mean (Center)',
            data: xBarRData.map(() => xBarStats.mean),
            borderColor: '#4caf50',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            type: 'line' as const,
          },
          {
            label: 'USL',
            data: xBarRData.map(() => xBarStats.USL),
            borderColor: '#f44336',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            type: 'line' as const,
          },
          {
            label: 'LSL',
            data: xBarRData.map(() => xBarStats.LSL),
            borderColor: '#f44336',
            borderDash: [5, 5],
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            type: 'line' as const,
          },
        ],
      };
    
      const xBarChartOptions = {
        responsive: true,
        plugins: {
          legend: { position: 'top' as const },
          tooltip: { mode: 'index' as const, intersect: false },
          title: {
            display: true,
            text: 'X̄ Chart (Mean)',
            font: { size: 18 },
          },
        },
        scales: {
          y: {
            min: yMin,
            max: yMax,
          },
        },
      };
    
      return (
        <div
          className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6"
          data-testid="xbar-container"
        >
          <div data-testid="xbar-graph">
            <GraphComponent
              type="line"
              data={xBarChartData}
              options={xBarChartOptions}
              height={300}
              width={900}
            />
          </div>
    
          <div className="bg-white rounded-lg p-6 shadow" data-testid="xbar-stats">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <div className="space-y-1">
              <div data-testid="xbar-usl"><span className="font-medium">USL:</span> {xBarStats.USL}</div>
              <div data-testid="xbar-lsl"><span className="font-medium">LSL:</span> {xBarStats.LSL}</div>
              <div data-testid="xbar-mean"><span className="font-medium">Mean:</span> {xBarStats.mean}</div>
              <div data-testid="xbar-sigma"><span className="font-medium">σ:</span> {xBarStats.sigma}</div>
            </div>
            <hr className="my-3" />
            <h3 className="font-semibold mb-2">Legend</h3>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-4 h-1 bg-black inline-block rounded"></span>
              <span>X̄</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-4 h-1 bg-green-600 border-dashed inline-block rounded"></span>
              <span>Mean</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-4 h-1 bg-red-600 border-dashed inline-block rounded"></span>
              <span>USL / LSL</span>
            </div>
          </div>
        </div>
      );
    };
    
    export default XBarChart;
    