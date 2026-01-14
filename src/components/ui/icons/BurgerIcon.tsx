import React from 'react';

interface BurgerIconProps {
  size?: number;
  color?: string;
}

export const BurgerIcon: React.FC<BurgerIconProps> = ({ size = '24', color = 'var(--secondary)' }) => {
  return (
    <svg
      id="Fast_Food_Double_Burger_24"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="24" height="24" stroke="none" fill="#000000" opacity="0" />

      <g transform="matrix(0.83 0 0 0.83 12 12)">
        <g style={{}}>
          <g transform="matrix(1 0 0 1 0 10)">
            <path
              style={{
                stroke: 'none',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -22)"
              d="M 2.5 20.5 L 2.5 21.5 C 2.5 22.0304 2.71071 22.5391 3.08579 22.9142 C 3.46086 23.2893 3.96957 23.5 4.5 23.5 L 19.5 23.5 C 20.0304 23.5 20.5391 23.2893 20.9142 22.9142 C 21.2893 22.5391 21.5 22.0304 21.5 21.5 L 21.5 20.5"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 10)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'round',
                strokeDashoffset: 0,
                strokeLinejoin: 'round',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -22)"
              d="M 2.5 20.5 L 2.5 21.5 C 2.5 22.0304 2.71071 22.5391 3.08579 22.9142 C 3.46086 23.2893 3.96957 23.5 4.5 23.5 L 19.5 23.5 C 20.0304 23.5 20.5391 23.2893 20.9142 22.9142 C 21.2893 22.5391 21.5 22.0304 21.5 21.5 L 21.5 20.5"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 6.5)">
            <path
              style={{
                stroke: 'none',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -18.5)"
              d="M 23.5 18.5 C 23.5 19.0304 23.2893 19.5391 22.9142 19.9142 C 22.5391 20.2893 22.0304 20.5 21.5 20.5 L 2.5 20.5 C 1.96957 20.5 1.46086 20.2893 1.08579 19.9142 C 0.710714 19.5391 0.5 19.0304 0.5 18.5 C 0.5 17.9696 0.710714 17.4609 1.08579 17.0858 C 1.46086 16.7107 1.96957 16.5 2.5 16.5 L 12 16.5 L 16.71 18.86 C 17.0865 19.0459 17.5117 19.1092 17.926 19.041 C 18.3403 18.9729 18.7229 18.7767 19.02 18.48 L 21 16.5 L 21.5 16.5 C 22.0304 16.5 22.5391 16.7107 22.9142 17.0858 C 23.2893 17.4609 23.5 17.9696 23.5 18.5 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 7.5)">
            <path
              style={{
                stroke: 'none',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -19.5)"
              d="M 2.5 20.5 L 21.5 20.5 C 22.0304 20.5 22.5391 20.2893 22.9142 19.9142 C 23.2893 19.5391 23.5 19.0304 23.5 18.5 L 18.992 18.5 C 18.695 18.7877 18.3164 18.9766 17.908 19.041 C 17.4995 19.1055 17.0812 19.0422 16.71 18.86 L 15.991 18.5 L 0.5 18.5 C 0.501845 19.0299 0.713151 19.5375 1.08782 19.9122 C 1.4625 20.2868 1.97013 20.4982 2.5 20.5 L 2.5 20.5 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 6.5)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'round',
                strokeDashoffset: 0,
                strokeLinejoin: 'round',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -18.5)"
              d="M 23.5 18.5 C 23.5 19.0304 23.2893 19.5391 22.9142 19.9142 C 22.5391 20.2893 22.0304 20.5 21.5 20.5 L 2.5 20.5 C 1.96957 20.5 1.46086 20.2893 1.08579 19.9142 C 0.710714 19.5391 0.5 19.0304 0.5 18.5 C 0.5 17.9696 0.710714 17.4609 1.08579 17.0858 C 1.46086 16.7107 1.96957 16.5 2.5 16.5 L 12 16.5 L 16.71 18.86 C 17.0865 19.0459 17.5117 19.1092 17.926 19.041 C 18.3403 18.9729 18.7229 18.7767 19.02 18.48 L 21 16.5 L 21.5 16.5 C 22.0304 16.5 22.5391 16.7107 22.9142 17.0858 C 23.2893 17.4609 23.5 17.9696 23.5 18.5 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 4.5 5.78)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'round',
                strokeDashoffset: 0,
                strokeLinejoin: 'round',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-16.5, -17.78)"
              d="M 21 16.5 L 19.02 18.48 C 18.7229 18.7767 18.3164 18.9766 17.908 19.041 C 17.4995 19.1055 17.0812 19.0422 16.71 18.86 L 12 16.5 L 21 16.5 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 2.25)">
            <path
              style={{
                stroke: 'none',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -14.25)"
              d="M 23.5 14.5 C 23.5 15.0304 23.2893 15.5391 22.9142 15.9142 C 22.5391 16.2893 22.0304 16.5 21.5 16.5 L 2.5 16.5 C 1.96957 16.5 1.46086 16.2893 1.08579 15.9142 C 0.710714 15.5391 0.5 15.0304 0.5 14.5 C 0.5 13.9696 0.710714 13.4609 1.08579 13.0858 C 1.46086 12.7107 1.96957 12.5 2.5 12.5 C 3.04402 12.5203 3.57695 12.3426 4 12 C 4.23395 12.4594 4.59248 12.8438 5.03458 13.109 C 5.47669 13.3743 5.98452 13.5098 6.5 13.5 C 7.02337 13.5575 7.55118 13.442 8.00268 13.1711 C 8.45417 12.9002 8.80448 12.4889 9 12 C 9.30764 12.5075 9.75258 12.9177 10.2834 13.1831 C 10.8143 13.4486 11.4094 13.5584 12 13.5 C 12.5909 13.5607 13.1868 13.4519 13.7181 13.1863 C 14.2494 12.9206 14.6941 12.5091 15 12 C 15.1977 12.4873 15.5485 12.8971 15.9994 13.1676 C 16.4503 13.4382 16.977 13.5549 17.5 13.5 C 18.0155 13.5098 18.5233 13.3743 18.9654 13.109 C 19.4075 12.8438 19.766 12.4594 20 12 C 20.4246 12.3399 20.9564 12.5171 21.5 12.5 C 22.0304 12.5 22.5391 12.7107 22.9142 13.0858 C 23.2893 13.4609 23.5 13.9696 23.5 14.5 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 3.6)">
            <path
              style={{
                stroke: 'none',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -15.6)"
              d="M 0.519001 14.691 C 0.566332 15.1844 0.795196 15.6427 1.16122 15.9769 C 1.52724 16.3111 2.00434 16.4976 2.5 16.5 L 21.5 16.5 C 21.9961 16.4989 22.4739 16.313 22.8402 15.9784 C 23.2065 15.6439 23.435 15.1849 23.481 14.691 L 0.519001 14.691 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 2.25)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'round',
                strokeDashoffset: 0,
                strokeLinejoin: 'round',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -14.25)"
              d="M 23.5 14.5 C 23.5 15.0304 23.2893 15.5391 22.9142 15.9142 C 22.5391 16.2893 22.0304 16.5 21.5 16.5 L 2.5 16.5 C 1.96957 16.5 1.46086 16.2893 1.08579 15.9142 C 0.710714 15.5391 0.5 15.0304 0.5 14.5 C 0.5 13.9696 0.710714 13.4609 1.08579 13.0858 C 1.46086 12.7107 1.96957 12.5 2.5 12.5 C 3.04402 12.5203 3.57695 12.3426 4 12 C 4.23395 12.4594 4.59248 12.8438 5.03458 13.109 C 5.47669 13.3743 5.98452 13.5098 6.5 13.5 C 7.02337 13.5575 7.55118 13.442 8.00268 13.1711 C 8.45417 12.9002 8.80448 12.4889 9 12 C 9.30764 12.5075 9.75258 12.9177 10.2834 13.1831 C 10.8143 13.4486 11.4094 13.5584 12 13.5 C 12.5909 13.5607 13.1868 13.4519 13.7181 13.1863 C 14.2494 12.9206 14.6941 12.5091 15 12 C 15.1977 12.4873 15.5485 12.8971 15.9994 13.1676 C 16.4503 13.4382 16.977 13.5549 17.5 13.5 C 18.0155 13.5098 18.5233 13.3743 18.9654 13.109 C 19.4075 12.8438 19.766 12.4594 20 12 C 20.4246 12.3399 20.9564 12.5171 21.5 12.5 C 22.0304 12.5 22.5391 12.7107 22.9142 13.0858 C 23.2893 13.4609 23.5 13.9696 23.5 14.5 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 -0.49)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'round',
                strokeDashoffset: 0,
                strokeLinejoin: 'round',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -11.51)"
              d="M 23.5 11 C 23.5 12.1 22.61 12.5 21.5 12.5 C 20.9564 12.5171 20.4246 12.3399 20 12 C 19.766 12.4594 19.4075 12.8438 18.9654 13.109 C 18.5233 13.3743 18.0155 13.5098 17.5 13.5 C 16.977 13.5549 16.4503 13.4382 15.9994 13.1676 C 15.5485 12.8971 15.1977 12.4873 15 12 C 14.6941 12.5091 14.2494 12.9206 13.7181 13.1863 C 13.1868 13.4519 12.5909 13.5607 12 13.5 C 11.4094 13.5584 10.8143 13.4486 10.2834 13.1831 C 9.75258 12.9177 9.30764 12.5075 9 12 C 8.80448 12.4889 8.45417 12.9002 8.00268 13.1711 C 7.55118 13.442 7.02337 13.5575 6.5 13.5 C 5.98452 13.5098 5.47669 13.3743 5.03458 13.109 C 4.59248 12.8438 4.23395 12.4594 4 12 C 3.57695 12.3426 3.04402 12.5203 2.5 12.5 C 1.4 12.5 0.5 12.1 0.5 11 C 0.5 9.9 2.5 9.5 2.5 9.5 L 21.5 9.5 C 21.5 9.5 23.5 9.9 23.5 11 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 -7)">
            <path
              style={{
                stroke: 'none',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -5)"
              d="M 21.5 9.5 C 21.5 4.253 17.246 0.5 12 0.5 C 6.754 0.5 2.5 4.253 2.5 9.5 L 21.5 9.5 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 -7)">
            <path
              style={{
                stroke: 'none',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: color,
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -5)"
              d="M 12 3.932 C 13.8587 3.87538 15.6919 4.37511 17.2648 5.36713 C 18.8376 6.35915 20.0784 7.79826 20.828 9.5 L 21.5 9.5 C 21.5 4.253 17.246 0.5 12 0.5 C 6.754 0.5 2.5 4.253 2.5 9.5 L 3.175 9.5 C 3.92435 7.79866 5.16461 6.35981 6.73688 5.36781 C 8.30914 4.37581 10.1418 3.87585 12 3.932 L 12 3.932 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0 -7)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'round',
                strokeDashoffset: 0,
                strokeLinejoin: 'round',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12, -5)"
              d="M 21.5 9.5 C 21.5 4.253 17.246 0.5 12 0.5 C 6.754 0.5 2.5 4.253 2.5 9.5 L 21.5 9.5 Z"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 -5.13 -6.69)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-6.88, -5.31)"
              d="M 7 5.564 C 6.86193 5.564 6.75 5.45207 6.75 5.314 C 6.75 5.17593 6.86193 5.064 7 5.064"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 -4.88 -6.69)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-7.13, -5.31)"
              d="M 7 5.564 C 7.13807 5.564 7.25 5.45207 7.25 5.314 C 7.25 5.17593 7.13807 5.064 7 5.064"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 -2.63 -8.19)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-9.38, -3.81)"
              d="M 9.5 4.064 C 9.36193 4.064 9.25 3.95207 9.25 3.814 C 9.25 3.67593 9.36193 3.564 9.5 3.564"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 -2.38 -8.19)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-9.63, -3.81)"
              d="M 9.5 4.064 C 9.63807 4.064 9.75 3.95207 9.75 3.814 C 9.75 3.67593 9.63807 3.564 9.5 3.564"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 -0.13 -6.69)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-11.88, -5.31)"
              d="M 12 5.564 C 11.8619 5.564 11.75 5.45207 11.75 5.314 C 11.75 5.17593 11.8619 5.064 12 5.064"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 0.13 -6.69)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-12.13, -5.31)"
              d="M 12 5.564 C 12.1381 5.564 12.25 5.45207 12.25 5.314 C 12.25 5.17593 12.1381 5.064 12 5.064"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 2.38 -8.19)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-14.38, -3.81)"
              d="M 14.5 4.064 C 14.3619 4.064 14.25 3.95207 14.25 3.814 C 14.25 3.67593 14.3619 3.564 14.5 3.564"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 2.63 -8.19)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-14.63, -3.81)"
              d="M 14.5 4.064 C 14.6381 4.064 14.75 3.95207 14.75 3.814 C 14.75 3.67593 14.6381 3.564 14.5 3.564"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 4.88 -6.69)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-16.88, -5.31)"
              d="M 17 5.564 C 16.8619 5.564 16.75 5.45207 16.75 5.314 C 16.75 5.17593 16.8619 5.064 17 5.064"
              strokeLinecap="round"
            />
          </g>
          <g transform="matrix(1 0 0 1 5.13 -6.69)">
            <path
              style={{
                stroke: 'var(--gray-600)',
                strokeWidth: 1,
                strokeDasharray: 'none',
                strokeLinecap: 'butt',
                strokeDashoffset: 0,
                strokeLinejoin: 'miter',
                strokeMiterlimit: 4,
                fill: 'none',
                fillRule: 'nonzero',
                opacity: 1
              }}
              transform="translate(-17.13, -5.31)"
              d="M 17 5.564 C 17.1381 5.564 17.25 5.45207 17.25 5.314 C 17.25 5.17593 17.1381 5.064 17 5.064"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
