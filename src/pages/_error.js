import { Button, Stack, Typography } from "@mui/material"
import { Box } from "@mui/material"
import Image from 'next/image'
import ErrorView from "../component/templates/ErrorView"

const IMAGE_SIZE = 16
function Error({ statusCode }) {
    return (
        <p>
            {statusCode
                ? (
                    <ErrorView statusCode={statusCode} title={statusCode === 404 ? 'Halaman yang anda cari tidak ada.' : 'Maaf, terjadi kesalahan pada Server.'} svg={statusCode === 404 ? <SvgNF /> : undefined} />
                )
                : (
                    <ErrorView title='Maaf, terjadi kesalahan pada Client.' />
                )}
        </p>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error;

const SvgNF = () => {
    return (
        <svg width="inherit" height="inherit" viewBox="0 0 1060 559" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M888.137 0.365234H244.275V412.723H888.137V0.365234Z" fill="#E6E6E6" />
            <path d="M869.726 52.085H262.686V388.328H869.726V52.085Z" fill="white" />
            <path d="M887.862 0H244V27.3536H887.862V0Z" fill="#004F5D" />
            <path d="M264.327 19.0546C267.127 19.0546 269.397 16.7848 269.397 13.9848C269.397 11.1849 267.127 8.91504 264.327 8.91504C261.527 8.91504 259.257 11.1849 259.257 13.9848C259.257 16.7848 261.527 19.0546 264.327 19.0546Z" fill="white" />
            <path d="M283.571 19.0546C286.371 19.0546 288.64 16.7848 288.64 13.9848C288.64 11.1849 286.371 8.91504 283.571 8.91504C280.771 8.91504 278.501 11.1849 278.501 13.9848C278.501 16.7848 280.771 19.0546 283.571 19.0546Z" fill="white" />
            <path d="M302.814 19.0546C305.614 19.0546 307.884 16.7848 307.884 13.9848C307.884 11.1849 305.614 8.91504 302.814 8.91504C300.014 8.91504 297.744 11.1849 297.744 13.9848C297.744 16.7848 300.014 19.0546 302.814 19.0546Z" fill="white" />
            <path d="M473.824 86.9727H317.844V353.439H473.824V86.9727Z" fill="#E6E6E6" />
            <path d="M630.733 86.9727H500.75V160.321H630.733V86.9727Z" fill="#004F5D" />
            <path d="M630.733 180.747H500.75V259.666H630.733V180.747Z" fill="#E6E6E6" />
            <path d="M630.733 280.092H500.75V353.44H630.733V280.092Z" fill="#E6E6E6" />
            <path d="M814.567 86.9727H658.587V203.097H814.567V86.9727Z" fill="#E6E6E6" />
            <path d="M814.567 237.314H658.587V353.439H814.567V237.314Z" fill="#E6E6E6" />
            <path d="M754.479 211.44V186.44C754.479 177.556 758.008 169.035 764.29 162.752C770.573 156.47 779.094 152.94 787.979 152.94C796.863 152.94 805.384 156.47 811.667 162.752C817.949 169.035 821.479 177.556 821.479 186.44V211.44C821.477 212.633 821.003 213.777 820.159 214.621C819.315 215.465 818.172 215.939 816.979 215.94H758.979C757.785 215.939 756.642 215.465 755.798 214.621C754.954 213.777 754.48 212.633 754.479 211.44Z" fill="#2F2E41" />
            <path d="M837.514 536.786L825.698 540.056L807.462 496.038L824.901 491.212L837.514 536.786Z" fill="#FFB8B8" />
            <path d="M816.324 539.016L839.111 532.709L843.082 547.057L805.947 557.334C805.426 555.45 805.281 553.481 805.52 551.541C805.759 549.601 806.378 547.727 807.342 546.026C808.305 544.325 809.595 542.83 811.136 541.627C812.677 540.425 814.44 539.537 816.324 539.016Z" fill="#2F2E41" />
            <path d="M714.328 545.875H702.068L696.235 498.587H714.33L714.328 545.875Z" fill="#FFB8B8" />
            <path d="M693.311 542.371H716.955V557.258H678.424C678.424 555.303 678.809 553.367 679.557 551.561C680.305 549.755 681.402 548.114 682.784 546.731C684.166 545.349 685.808 544.252 687.614 543.504C689.42 542.756 691.356 542.371 693.311 542.371Z" fill="#2F2E41" />
            <path d="M699.544 281.598C700.42 282.779 701.543 283.754 702.836 284.454C704.128 285.154 705.559 285.563 707.026 285.65C708.494 285.738 709.963 285.502 711.329 284.961C712.696 284.419 713.927 283.584 714.936 282.515L747.527 297.173L744.562 278.842L714.069 267.733C712.16 266.156 709.74 265.335 707.267 265.423C704.793 265.512 702.438 266.505 700.648 268.214C698.858 269.923 697.757 272.23 697.553 274.696C697.35 277.163 698.058 279.619 699.545 281.598H699.544Z" fill="#FFB8B8" />
            <path d="M767.259 391.836C757.02 391.836 746.42 390.311 737.51 385.775C732.78 383.414 728.589 380.103 725.198 376.048C721.806 371.993 719.288 367.282 717.801 362.209C713.159 347.51 719.012 333.069 724.673 319.104C728.18 310.45 731.493 302.277 732.353 294.22L732.653 291.36C733.992 278.512 735.148 267.417 741.55 263.255C744.869 261.098 749.33 260.975 755.191 262.878L810.236 280.759L808.212 385.25L807.877 385.361C807.589 385.458 788.185 391.836 767.259 391.836Z" fill="#2F2E41" />
            <path d="M754.229 230.348C754.229 230.348 781.229 222.348 802.229 225.348C802.229 225.348 790.229 291.348 794.229 313.348C798.229 335.348 724.729 321.848 739.729 300.848L744.729 275.848C744.729 275.848 734.729 265.848 743.729 253.848L754.229 230.348Z" fill="#004F5D" />
            <path d="M740.948 389.855L707.672 383.616L719.29 294.209C720.071 291.713 738.068 235.066 746.241 232.001C752.176 229.911 758.245 228.225 764.407 226.955L765.591 226.718L758.919 236.727L732.354 300.381L740.948 389.855Z" fill="#2F2E41" />
            <path d="M723.61 534.919L680.615 527.753L704.743 429.229L740.646 294.492L741 296.885C741.029 297.063 744.383 314.665 794.151 306.854L794.589 306.786L794.71 307.212L854.862 519.75L805.871 527.915L761.188 372.848L723.61 534.919Z" fill="#2F2E41" />
            <path d="M783.202 406.587L783.229 405.83C783.259 404.99 786.217 321.458 785.229 287.863C784.237 254.154 795.151 224.962 795.261 224.671L795.35 224.437L795.591 224.367C809.711 220.334 821.96 232.373 822.082 232.495L822.254 232.667L818.233 265.843L835.449 386.484L783.202 406.587Z" fill="#2F2E41" />
            <path d="M781.095 215.358C794.659 215.358 805.656 204.362 805.656 190.797C805.656 177.233 794.659 166.236 781.095 166.236C767.53 166.236 756.534 177.233 756.534 190.797C756.534 204.362 767.53 215.358 781.095 215.358Z" fill="#FFB8B8" />
            <path d="M746.553 188.44C746.561 181.415 749.356 174.679 754.324 169.711C759.292 164.743 766.027 161.948 773.053 161.94H778.053C785.079 161.948 791.815 164.743 796.783 169.711C801.751 174.679 804.545 181.415 804.553 188.44V188.94H793.987L790.383 178.849L789.662 188.94H784.201L782.383 183.849L782.019 188.94H746.553V188.44Z" fill="#2F2E41" />
            <path d="M778.678 218.751C778.182 218.079 777.885 217.281 777.823 216.448C777.761 215.615 777.935 214.782 778.325 214.044C783.624 203.966 791.043 185.344 781.195 173.859L780.488 173.034H809.075V215.954L783.106 220.536C782.843 220.583 782.576 220.606 782.309 220.606C781.6 220.606 780.901 220.438 780.27 220.116C779.639 219.793 779.093 219.325 778.678 218.751Z" fill="#2F2E41" />
            <path d="M663.58 41.5465C643.576 24.6668 619.097 13.9653 593.122 10.7442C567.147 7.52309 540.795 11.9213 517.274 23.4035C493.753 34.8858 474.077 52.957 460.639 75.4183C447.201 97.8795 440.581 123.762 441.585 149.917C442.59 176.072 451.174 201.371 466.294 222.736C481.415 244.101 502.419 260.61 526.751 270.256C551.083 279.901 577.694 282.266 603.346 277.063C628.998 271.86 652.584 259.313 671.235 240.949L836.853 380.697C839.373 382.827 842.636 383.87 845.925 383.594C849.213 383.319 852.257 381.748 854.388 379.229C856.518 376.709 857.56 373.445 857.285 370.157C857.009 366.869 855.439 363.825 852.919 361.694L852.901 361.679L687.283 221.931C706.522 194.318 714.757 160.515 710.372 127.147C705.988 93.7795 689.3 63.2517 663.58 41.5465ZM652.903 208.474C640.001 223.765 622.854 234.887 603.631 240.432C584.408 245.978 563.972 245.699 544.907 239.63C525.843 233.562 509.006 221.976 496.526 206.338C484.046 190.701 476.483 171.714 474.794 151.778C473.106 131.842 477.366 111.853 487.037 94.3392C496.709 76.825 511.357 62.5719 529.128 53.3825C546.9 44.1931 566.998 40.48 586.88 42.7127C606.762 44.9455 625.536 53.0239 640.827 65.9262H640.827C650.979 74.4931 659.346 84.9758 665.447 96.7759C671.549 108.576 675.266 121.462 676.388 134.699C677.509 147.936 676.012 161.264 671.983 173.922C667.953 186.581 661.47 198.321 652.903 208.474Z" fill="#C4852B" />
            <path opacity="0.3" d="M510.355 220.551C490.949 204.174 478.411 181.099 475.231 155.906C472.051 130.714 478.462 105.246 493.19 84.5615C491.256 86.5094 489.386 88.5493 487.58 90.6814C479.013 100.834 472.53 112.575 468.501 125.233C464.471 137.892 462.975 151.22 464.096 164.457C465.217 177.693 468.935 190.58 475.037 202.38C481.138 214.18 489.504 224.662 499.657 233.229C509.81 241.796 521.55 248.279 534.209 252.309C546.867 256.338 560.195 257.835 573.432 256.714C586.669 255.592 599.555 251.875 611.355 245.773C623.155 239.672 633.638 231.306 642.205 221.153C644.006 219.018 645.702 216.832 647.294 214.594C629.381 232.592 605.356 243.195 579.987 244.299C554.619 245.402 529.763 236.925 510.355 220.551Z" fill="black" />
            <path d="M788.98 324.536C790.408 324.885 791.896 324.917 793.337 324.629C794.779 324.341 796.14 323.741 797.324 322.87C798.509 322 799.488 320.88 800.193 319.59C800.898 318.3 801.311 316.871 801.404 315.404L835.837 305.846L821.84 293.643L791.288 304.589C788.813 304.597 786.427 305.512 784.581 307.161C782.735 308.81 781.559 311.079 781.275 313.538C780.99 315.996 781.617 318.474 783.038 320.501C784.458 322.528 786.572 323.964 788.98 324.536Z" fill="#FFB8B8" />
            <path d="M803.292 319.477L801.197 299.571L829.959 283.702L811.207 261.001L814.266 235.502L821.886 232.236L822.123 232.541C825.716 237.161 857.228 277.822 857.228 282.848C857.228 288.011 851.2 303.171 842.952 307.295C834.996 311.273 805.121 319.005 803.853 319.332L803.292 319.477Z" fill="#2F2E41" />
            <path d="M1057.23 558.594H2.76762C2.0336 558.594 1.32952 558.488 0.81049 558.301C0.291459 558.113 0 557.859 0 557.594C0 557.329 0.291459 557.074 0.81049 556.887C1.32952 556.699 2.0336 556.594 2.76762 556.594H1057.23C1057.97 556.594 1058.67 556.699 1059.19 556.887C1059.71 557.074 1060 557.329 1060 557.594C1060 557.859 1059.71 558.113 1059.19 558.301C1058.67 558.488 1057.97 558.594 1057.23 558.594Z" fill="black" />
            <path d="M515.368 130.4V130.464C515.368 130.507 515.389 130.528 515.432 130.528H525.992C526.376 130.528 526.568 130.357 526.568 130.016V114.528C526.568 114.485 526.547 114.464 526.504 114.464C526.419 114.464 526.376 114.485 526.376 114.528L515.368 130.4ZM509.352 139.04C508.371 139.04 507.517 138.677 506.792 137.952C506.109 137.227 505.768 136.373 505.768 135.392V134.176C505.768 131.787 506.472 129.589 507.88 127.584L524.456 104.224C525.864 102.261 527.763 101.28 530.152 101.28H533.352C534.333 101.28 535.165 101.643 535.848 102.368C536.573 103.093 536.936 103.947 536.936 104.928V130.016C536.936 130.357 537.128 130.528 537.512 130.528H540.072C541.053 130.528 541.907 130.891 542.632 131.616C543.357 132.341 543.72 133.195 543.72 134.176V135.392C543.72 136.373 543.357 137.227 542.632 137.952C541.907 138.677 541.053 139.04 540.072 139.04H537.512C537.128 139.04 536.936 139.232 536.936 139.616V144.352C536.936 145.333 536.573 146.187 535.848 146.912C535.165 147.637 534.333 148 533.352 148H530.152C529.171 148 528.317 147.637 527.592 146.912C526.909 146.187 526.568 145.333 526.568 144.352V139.616C526.568 139.232 526.376 139.04 525.992 139.04H509.352ZM573.157 112.416C571.962 110.069 570.085 108.896 567.525 108.896C564.965 108.896 563.066 110.069 561.829 112.416C560.634 114.763 560.037 118.837 560.037 124.64C560.037 130.443 560.634 134.517 561.829 136.864C563.066 139.211 564.965 140.384 567.525 140.384C570.085 140.384 571.962 139.211 573.157 136.864C574.394 134.517 575.013 130.443 575.013 124.64C575.013 118.837 574.394 114.763 573.157 112.416ZM581.477 143.008C578.448 146.763 573.797 148.64 567.525 148.64C561.253 148.64 556.581 146.763 553.509 143.008C550.48 139.253 548.965 133.131 548.965 124.64C548.965 116.149 550.48 110.027 553.509 106.272C556.581 102.517 561.253 100.64 567.525 100.64C573.797 100.64 578.448 102.517 581.477 106.272C584.549 110.027 586.085 116.149 586.085 124.64C586.085 133.131 584.549 139.253 581.477 143.008ZM598.818 130.4V130.464C598.818 130.507 598.839 130.528 598.882 130.528H609.442C609.826 130.528 610.018 130.357 610.018 130.016V114.528C610.018 114.485 609.997 114.464 609.954 114.464C609.869 114.464 609.826 114.485 609.826 114.528L598.818 130.4ZM592.802 139.04C591.821 139.04 590.967 138.677 590.242 137.952C589.559 137.227 589.218 136.373 589.218 135.392V134.176C589.218 131.787 589.922 129.589 591.33 127.584L607.906 104.224C609.314 102.261 611.213 101.28 613.602 101.28H616.802C617.783 101.28 618.615 101.643 619.298 102.368C620.023 103.093 620.386 103.947 620.386 104.928V130.016C620.386 130.357 620.578 130.528 620.962 130.528H623.522C624.503 130.528 625.357 130.891 626.082 131.616C626.807 132.341 627.17 133.195 627.17 134.176V135.392C627.17 136.373 626.807 137.227 626.082 137.952C625.357 138.677 624.503 139.04 623.522 139.04H620.962C620.578 139.04 620.386 139.232 620.386 139.616V144.352C620.386 145.333 620.023 146.187 619.298 146.912C618.615 147.637 617.783 148 616.802 148H613.602C612.621 148 611.767 147.637 611.042 146.912C610.359 146.187 610.018 145.333 610.018 144.352V139.616C610.018 139.232 609.826 139.04 609.442 139.04H592.802Z" fill="white" />
        </svg>

    )
}

const SvgAuth = () => {
    return (
        <svg width="inherit" height="inherit" viewBox="0 0 1060 604" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2623_3953)">
                <path d="M1050.55 532.711L1027.97 464.618C1027.97 464.618 1052.81 489.437 1052.81 509.801L1048.35 462.709C1048.35 462.709 1061.09 479.891 1059.82 505.983C1058.54 532.075 1050.55 532.711 1050.55 532.711Z" fill="#E6E6E6" />
                <path d="M565.554 470.709L543.513 404.253C543.513 404.253 567.757 428.475 567.757 448.35L563.406 402.39C563.406 402.39 575.839 419.159 574.595 444.623C573.352 470.088 565.554 470.709 565.554 470.709Z" fill="#E6E6E6" />
                <path d="M909.584 501.376C909.621 545.092 822.837 531.645 716.592 531.737C610.348 531.828 524.876 545.424 524.838 501.708C524.8 457.991 611.553 448.409 717.798 448.317C824.042 448.225 909.546 457.66 909.584 501.376Z" fill="#828282" />
                <path d="M1039.98 531.711H0V533.711H1039.98V531.711Z" fill="#3F3D56" />
                <path d="M835.124 442.337H821.234L814.623 388.811H835.124V442.337Z" fill="#A0616A" />
                <path d="M809.77 438.372H838.101V455.223H794.446V453.681C794.446 449.621 796.061 445.727 798.934 442.856C801.808 439.985 805.706 438.372 809.77 438.372V438.372Z" fill="#2F2E41" />
                <path d="M937.22 521.339H923.33L916.72 467.812H937.22V521.339Z" fill="#A0616A" />
                <path d="M911.866 517.375H940.197V534.226H896.542V532.684C896.542 528.624 898.157 524.73 901.031 521.859C903.904 518.988 907.802 517.375 911.866 517.375V517.375Z" fill="#2F2E41" />
                <path d="M1001.29 362.321C1002.25 361.158 1002.94 359.798 1003.32 358.338C1003.7 356.877 1003.75 355.352 1003.47 353.87C1003.2 352.387 1002.6 350.983 1001.72 349.756C1000.84 348.529 999.706 347.51 998.391 346.77L966.13 215.473L945.503 224.339L983.875 351.293C982.777 353.583 982.557 356.195 983.258 358.636C983.96 361.077 985.533 363.176 987.679 364.535C989.826 365.894 992.397 366.42 994.905 366.012C997.414 365.604 999.685 364.291 1001.29 362.321V362.321Z" fill="#A0616A" />
                <path d="M976.128 96.9666C974.977 95.7641 973.576 94.8285 972.024 94.2256C970.471 93.6226 968.805 93.3671 967.143 93.477C965.481 93.5869 963.864 94.0595 962.404 94.8615C960.945 95.6635 959.68 96.7755 958.697 98.1191L908.764 103.846L916.36 123.088L961.771 114.597C964.139 116.097 966.976 116.677 969.744 116.226C972.512 115.776 975.018 114.327 976.788 112.153C978.558 109.98 979.468 107.234 979.346 104.435C979.225 101.636 978.08 98.9786 976.128 96.9666V96.9666Z" fill="#A0616A" />
                <path d="M893.843 348.705L915.632 512.084L942.751 506.506C942.751 506.506 938.763 387.521 952.322 373.176C965.882 358.832 934.882 333.704 934.882 333.704L893.843 348.705Z" fill="#2F2E41" />
                <path d="M902.852 303.703L892.842 318.704C892.842 318.704 815.77 286.703 815.77 337.704C815.77 388.705 811.359 423.317 809.764 425.707C808.169 428.098 828.219 434.301 837.79 432.708C837.79 432.708 849.598 350.486 848.801 345.705C848.801 345.705 924.406 382.739 938.763 379.552C953.12 376.364 956.512 365.08 958.905 358.705C961.297 352.33 957.904 301.703 957.904 301.703L910.049 287.112L902.852 303.703Z" fill="#2F2E41" />
                <path d="M904.202 213.64L901.349 210.219C901.349 210.219 869.395 138.389 881.949 119.006C894.502 99.6229 949.28 96.7725 950.992 97.9127C952.704 99.0528 946.903 113.856 950.897 120.697C950.897 120.697 908.463 129.889 905.61 131.029C902.757 132.169 927.597 174.304 927.597 174.304L924.744 199.958L904.202 213.64Z" fill="#CCCCCC" />
                <path d="M960.121 178.294C960.121 178.294 930.45 181.715 929.309 181.715C928.167 181.715 927.597 174.304 927.597 174.304L901.349 210.219C901.349 210.219 888.418 314.414 891.841 312.703C895.265 310.993 958.409 320.815 958.98 316.255C959.551 311.694 958.409 288.891 960.121 287.75C961.833 286.61 989.793 215.92 989.793 215.92C989.793 215.92 986.94 201.098 977.239 195.967C967.539 190.836 960.121 178.294 960.121 178.294Z" fill="#CCCCCC" />
                <path d="M980.663 206.229L989.793 215.92C989.793 215.92 1003.36 327.284 995.94 330.704C988.522 334.125 973.919 333.704 973.919 333.704L959.551 280.909L980.663 206.229Z" fill="#CCCCCC" />
                <path d="M931.609 171.242C946.113 171.242 957.872 159.494 957.872 145.002C957.872 130.511 946.113 118.763 931.609 118.763C917.104 118.763 905.345 130.511 905.345 145.002C905.345 159.494 917.104 171.242 931.609 171.242Z" fill="#A0616A" />
                <path d="M925.446 149.097C925.091 143.652 918.216 143.466 912.755 143.414C907.294 143.363 900.765 143.557 897.675 139.059C895.633 136.086 896.023 131.958 897.71 128.77C899.397 125.583 902.172 123.131 904.902 120.773C911.95 114.684 919.214 108.643 927.676 104.746C936.138 100.848 946.054 99.2734 954.829 102.402C965.61 106.245 980.183 126.029 981.441 137.395C982.699 148.761 978.153 160.348 970.489 168.842C962.825 177.336 945.283 173.909 934.244 176.93C940.955 167.44 936.532 150.197 925.78 145.765L925.446 149.097Z" fill="#2F2E41" />
                <path d="M691.374 488.51C726.195 488.51 754.423 460.308 754.423 425.519C754.423 390.73 726.195 362.527 691.374 362.527C656.553 362.527 628.325 390.73 628.325 425.519C628.325 460.308 656.553 488.51 691.374 488.51Z" fill="#004F5D" />
                <path d="M649.269 358.051C640.531 358.052 631.98 355.522 624.651 350.768C617.322 346.014 611.53 339.239 607.974 331.264L507.928 106.165C504.614 98.7083 502.861 90.6535 502.777 82.4954C502.694 74.3373 504.281 66.2482 507.441 58.7255C510.602 51.2028 515.269 44.4053 521.155 38.7509C527.042 33.0964 534.024 28.7045 541.672 25.8451C549.32 22.9856 557.472 21.7191 565.628 22.1233C573.784 22.5275 581.771 24.5939 589.098 28.1955C596.425 31.7971 602.938 36.8578 608.236 43.0665C613.533 49.2752 617.504 56.5008 619.904 64.299L692.349 299.719C694.424 306.458 694.887 313.588 693.702 320.538C692.518 327.488 689.718 334.063 685.529 339.736C681.339 345.409 675.876 350.021 669.579 353.202C663.281 356.383 656.325 358.044 649.269 358.051H649.269Z" fill="#004F5D" />
                <path d="M110.756 243.965L110.651 244.233C110.58 244.412 110.635 244.536 110.814 244.606L155.06 261.938C156.669 262.569 157.754 262.169 158.315 260.739L183.777 195.861C183.848 195.682 183.793 195.557 183.614 195.487C183.257 195.347 183.043 195.367 182.973 195.545L110.756 243.965ZM71.3447 270.283C67.2329 268.673 64.2536 265.753 62.4069 261.524C60.739 257.365 60.7117 253.23 62.325 249.12L64.3241 244.026C68.2522 234.017 74.8143 225.968 84.0106 219.879L191.868 149.231C200.994 143.321 210.563 142.326 220.574 146.248L233.982 151.5C238.094 153.111 240.984 155.996 242.652 160.154C244.498 164.383 244.615 168.553 243.002 172.664L201.757 277.756C201.196 279.186 201.72 280.216 203.329 280.846L214.055 285.048C218.167 286.659 221.146 289.578 222.993 293.807C224.84 298.036 224.956 302.206 223.343 306.317L221.344 311.411C219.731 315.521 216.808 318.501 212.577 320.348C208.345 322.196 204.173 322.315 200.062 320.704L189.335 316.503C187.726 315.872 186.606 316.361 185.975 317.97L178.189 337.809C176.575 341.92 173.653 344.899 169.421 346.747C165.369 348.665 161.286 348.818 157.174 347.208L143.766 341.955C139.655 340.345 136.675 337.425 134.829 333.196C133.161 329.037 133.134 324.903 134.747 320.792L142.533 300.953C143.164 299.344 142.675 298.225 141.066 297.595L71.3447 270.283ZM382.132 263.353C380.984 251.562 375.047 243.566 364.32 239.364C353.594 235.162 343.71 236.961 334.667 244.76C325.804 252.629 316.602 268.717 307.063 293.025C297.523 317.332 293.327 335.381 294.475 347.171C295.801 359.032 301.828 367.064 312.554 371.265C323.281 375.467 333.076 373.633 341.939 365.764C350.981 357.965 360.272 341.912 369.812 317.605C379.352 293.298 383.458 275.214 382.132 263.353ZM366.699 405.157C347.834 415.913 325.261 416.144 298.981 405.849C272.702 395.555 256.212 380.023 249.513 359.253C242.993 338.552 246.712 310.419 260.671 274.852C274.629 239.285 291.042 216.124 309.907 205.368C328.951 194.682 351.613 194.486 377.893 204.78C404.173 215.074 420.573 230.571 427.093 251.272C433.792 272.042 430.162 300.21 416.204 335.777C402.245 371.344 385.744 394.471 366.699 405.157ZM471.441 335.145C468.167 336.131 465.38 335.348 463.081 332.798C460.96 330.318 460.532 327.469 461.794 324.252L469.475 304.681C473.473 294.494 480.741 288.061 491.28 285.385L526.15 276.155C536.509 273.409 546.874 274.066 557.242 278.128L574.137 284.746C578.248 286.356 581.228 289.276 583.074 293.505C584.921 297.734 585.038 301.904 583.424 306.014L518.611 471.159C516.998 475.27 514.076 478.249 509.844 480.097C505.612 481.945 501.441 482.064 497.329 480.453L480.435 473.835C476.323 472.225 473.344 469.305 471.497 465.076C469.65 460.847 469.534 456.677 471.147 452.567L522.282 322.274L522.014 322.169L521.746 322.064L471.441 335.145Z" fill="#C4852B" />
            </g>
            <defs>
                <clipPath id="clip0_2623_3953">
                    <rect width="1060" height="604" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}