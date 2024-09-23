import { Bounce, toast } from 'react-toastify'

export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val?.charAt(0)?.toUpperCase()}${val?.slice(1)}`
}

export const createPlaceholderCard = (column) => {
  return {
    _id: `${column?._id}-placeholder-card`,
    boardId: column?.boardId,
    columnId: column?._id,
    FE_PlaceholderCard: true
  }
}

export const createHtmlShareBoard = (data) => {
  return `
    <div
        <div
          style="
            width: 520px;
            margin: auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
              'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            font-size: 14px;
            color: #172b4d;
          ">
          <table
            style="
              width: 100%;
              background: #fafbfc;
              margin: 12px 0;
              padding: 40px 40px 25px;
              border-radius: 10px;
              border-spacing: 0px;
              text-align: left;
            ">
            <tbody>
              <tr>
                <td>
                  <img
                    width="85"
                    src="https://ci3.googleusercontent.com/meips/ADKq_Nak7B1vyzx0dPBXzcxwLRSH4CkF4bny9PPfxK03gOReeNpaRrpRKXuSI4qvhb656HtkTlucoxJD1W3dVsCNij0yqw=s0-d-e1-ft#https://trello.com/images/logo-new-sm-2x.png"
                    title="Trello"
                    class="CToWUd"
                    data-bit="iit" />
                </td>
              </tr>

              <tr>
                <td>
                  <h2
                    style="
                      font: 28px -apple-system, BlinkMacSystemFont, 'Segoe UI',
                        'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans',
                        'Helvetica Neue', sans-serif;
                      font-weight: 700;
                      line-height: 33px;
                      margin: 20px 0 16px;
                      letter-spacing: -0.5px;
                    ">
                   ${data.name} đã mời bạn vào bảng của họ MyTrello
                  </h2>

                  <p style="line-height: 21px">
                    Tham gia cùng họ trên Trello để cộng tác, quản lý dự án và
                    đạt đỉnh năng suất mới.
                  </p>

                  <p style="margin: 24px 0; line-height: 32px">
                    <a
                      href="${data.href}"
                      style="
                        border-radius: 3px;
                        background: #0052cc;
                        color: #ffffff;
                        font-weight: 500;
                        line-height: 20px;
                        font-weight: 500;
                        text-decoration: none;
                        padding: 8px 15px;
                        margin-bottom: 0;
                      "
                      target="_blank">
                      Đến bảng
                    </a>
                  </p>

                  <p style="line-height: 21px; margin: 0; margin-top: 24px">
                    <b>Trello là gì?</b> Hãy tưởng tượng một chiếc bảng màu
                    trắng, dán đầy danh sách giấy ghi chú vàng, mỗi ghi chú
                    tương đương với một tác vụ. Giờ, giả sử mỗi giấy ghi chú
                    vàng đều có hình ảnh, tệp đính kèm từ các nguồn dữ liệu khác
                    như Jira hoặc Salesforce, tài liệu, ngày đến hạn và các
                    thông tin khác. <br /><br />
                    Hãy hình dung bạn có thể đem theo chiếc bảng trắng đi bất cứ
                    nơi nào trên điện thoại thông minh của mình, đồng thời có
                    thể truy cập bảng này từ mọi máy tính thông qua mạng. Đó
                    chính là Trello!
                    <a
                      href=${data.href}
                      style="color: #5e6c84"
                      target="_blank"
                      >Tìm hiểu thêm</a
                    >
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div
            style="
              width: 405px;
              border-top: solid 2px #dfe1e6;
              margin: 48px auto 0;
              text-align: center;
            ">
            <div style="margin-top: 22px">
              <img
                width="147"
                src="https://ci3.googleusercontent.com/meips/ADKq_NYWNgehCpxtHrpK7UL6VE-7bV3kc5ybhatv-ECKJ31CDv71rHmRZevhHHnPM9GGI07v-A1xryvGEJIUf8aNVUCo9Q=s0-d-e1-ft#https://trello.com/images/atlassian-logo.png"
                title="Atlassian" />
            </div>
          </div>

          <img
            border="0"
            width="1"
            height="1"
            alt=""
            src="https://ci3.googleusercontent.com/meips/ADKq_NZCdZiQ8jiPSuzeKZYjZR2nPVsJxYm9-TbveAVPNovT86ruegB6B7z9jgieKJwbLqzpwndDQ8fAp_Nx5vYk_CEGNJDxA41ZB0BGMgZ5k0YLxl6XR-7tbUENguvFOKAnLNgHMMMDYTAqouOy_q14k1LdkvqlsKl3hDnP0ap23QxOsU2bZYSYdnSgGFOGA-jpdrWS0l-odt_b0s7GTLsYkKnVb-aUXpaOxrHD6vf8Y9zY=s0-d-e1-ft#https://atlas-trk.prd.msg.ss-inf.net/q/gUc5OSz6p4AmAx25tC--Ew~~/AAAAAQA~/RgRoqcqVPlcLYXRsYXNzaWFudXNCCma7lUXHZqmKbrdSEm52a3h4eDA0QGdtYWlsLmNvbVgEAAAAAA~~"
            />
    </div>
  `
}

export const createHtmlOTPVerifyEmail = (data) => {
  const otpPrev = Math.floor(data.OTP / 1000)
  const otpNext = data.OTP % 1000
  return `
     <div style="max-width: 520px; margin: 0 auto">
      <div
        style="
          vertical-align: top;
          text-align: left;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.005em;
          color: #091e42;
          line-height: 20px;
        ">
        <div
          style="
            padding-top: 30px;
            padding-bottom: 20px;
            vertical-align: top;
            text-align: center;
          ">
          <a
            href="#"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=https://www.atlassian.com&amp;source=gmail&amp;ust=1725019577826000&amp;usg=AOvVaw0wPAfXjrs4gBVa5DEUi5rK"
            ><img
              src="https://ci3.googleusercontent.com/meips/ADKq_Na6XzjWLy087GFD9hbEVqXoklvXJNS90Id5N9MxbfEi4xqTyfVUuwJG-PPQvOSGaaoV_Hmp8_0sVuzpjjCAg-gS-OyuVLoCZvj9xOIyPeNjBlvbaMKaPJf9qjvRQErEmAZ9QNIYV4u4H0B49K_9zg=s0-d-e1-ft#https://id-mail-assets.atlassian.com/shared/id-summit/id-summit-email_logo_360x80_NEW.png"
              height="30"
              alt="Atlassian"
              style="
                line-height: 100%;
                outline: none;
                text-decoration: none;
                border: 0;
              "
              class="CToWUd"
              data-bit="iit"
          /></a>
        </div>
        <hr
          style="
            margin-top: 24px;
            margin-bottom: 24px;
            border: 0;
            border-bottom: 1px solid #c1c7d0;
          " />
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse">
          <tbody>
            <tr>
              <td align="center">
                <img
                  src="https://ci3.googleusercontent.com/meips/ADKq_NbpMMFqVi5tm5CYGs09iCodBybQn5XOrIqo7OBYG2ziU88GBH3yuWVNWpqVza_CprxKcOgjhCX-RcABOWvK9YkH9uMi_oW4jVYtxVqfRi_2buB7KI6iqnkDSh1M9yqArbStd1WW5GlDReF4tw=s0-d-e1-ft#https://id-mail-assets.atlassian.com/template/aid_signup_welcome_verify_adg/people.png"
                  height="175"
                  border="0"
                  alt=""
                  style="
                    border: 0;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                  "
                  class="CToWUd a6T"
                  data-bit="iit"
                  tabindex="0" />
                <div
                  class="a6S"
                  dir="ltr"
                  style="opacity: 0.01; left: 391.2px; top: 271.8px">
                  <span
                    data-is-tooltip-wrapper="true"
                    class="a5q"
                    jsaction="JIbuQc:.CLIENT"
                    ><button
                      class="VYBDae-JX-I VYBDae-JX-I-ql-ay5-ays CgzRE"
                      jscontroller="PIVayb"
                      jsaction="click:h5M12e; clickmod:h5M12e;pointerdown:FEiYhc;pointerup:mF5Elf;pointerenter:EX0mI;pointerleave:vpvbp;pointercancel:xyn4sd;contextmenu:xexox;focus:h06R8; blur:zjh6rb;mlnRJb:fLiPzd;"
                      data-idom-class="CgzRE"
                      jsname="hRZeKc"
                      aria-label="Download attachment "
                      data-tooltip-enabled="true"
                      data-tooltip-id="tt-c9"
                      data-tooltip-classes="AZPksf"
                      id=""
                      jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTgwODY5OTY3MzY0ODQxOTczOSJd; 43:WyJpbWFnZS9qcGVnIl0.">
                      <span class="OiePBf-zPjgPe VYBDae-JX-UHGRz"></span
                      ><span
                        class="bHC-Q"
                        data-unbounded="false"
                        jscontroller="LBaJxb"
                        jsname="m9ZlFb"
                        soy-skip=""
                        ssk="6:RWVI5c"></span
                      ><span
                        class="VYBDae-JX-ank-Rtc0Jf"
                        jsname="S5tZuc"
                        aria-hidden="true"
                        ><span class="bzc-ank" aria-hidden="true"
                          ><svg
                            viewBox="0 -960 960 960"
                            height="20"
                            width="20"
                            focusable="false"
                            class="aoH">
                            <path
                              d="M480-336L288-528l51-51L444-474V-816h72v342L621-579l51,51L480-336ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72H696v-72h72v72q0,29.7-21.16,50.85T695.96-192H263.72Z"></path></svg></span
                      ></span>
                      <div class="VYBDae-JX-ano"></div>
                    </button>
                    </span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <h1
          style="
            margin-bottom: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 24px;
            font-weight: 500;
            letter-spacing: -0.01em;
            color: #172b4d;
            line-height: 28px;
            margin-top: 40px;
          ">
          Bạn đã sắp hoàn thành rồi!
        </h1>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.005em;
            color: #091e42;
            line-height: 20px;
            margin-top: 12px;
          ">
          <a style="text-decoration: none; color: inherit"
            >Xin chào ${data.email},</a
          >
        </p>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.005em;
            color: #091e42;
            line-height: 20px;
            margin-top: 12px;
          ">
          Mã xác minh của bạn là:
        </p>
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse">
          <tbody>
            <tr>
              <td align="center">
                <span
                  style="
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                      Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans,
                      Helvetica Neue, sans-serif;
                    font-size: 35px;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    color: #172b4d;
                    line-height: 40px;
                    padding-right: 5px;
                  "
                  >${otpPrev}</span
                ><span
                  style="
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                      Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans,
                      Helvetica Neue, sans-serif;
                    font-size: 35px;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    color: #172b4d;
                    line-height: 40px;
                    padding-left: 5px;
                  "
                  >${otpNext}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.005em;
            color: #091e42;
            line-height: 20px;
            margin-top: 12px;
          ">
          Nhập mã xác minh này để tiếp tục thiết lập tài khoản Atlassian. Mã này
          sẽ hết hạn sau 10 phút.
        </p>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.005em;
            color: #091e42;
            line-height: 20px;
            margin-top: 12px;
          ">
          Nếu bạn không yêu cầu mã này, hãy bỏ qua email này.
        </p>
        <hr
          style="
            margin-top: 24px;
            margin-bottom: 24px;
            border: 0;
            border-bottom: 1px solid #c1c7d0;
          " />
        <div
          style="
            color: #707070;
            font-size: 13px;
            line-height: 19px;
            text-align: center;
            margin-top: 10px;
          ">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            bgcolor="#ffffff"
            align="center"
            style="border-collapse: collapse">
            <tbody>
              <tr>
                <td
                  valign="top"
                  align="center"
                  style="
                    padding-top: 10px;
                    line-height: 18px;
                    text-align: center;
                    font-weight: none;
                    font-size: 12px;
                    color: #505f79;
                  ">
                  <span>Đây là tin nhắn Atlassian Cloud gửi cho bạn</span><br />
                </td>
              </tr>
              <tr valign="top">
                <td
                  align="center"
                  style="padding-top: 15px; padding-bottom: 30px">
                  <a
                    href="#"
                    target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=https://www.atlassian.com&amp;source=gmail&amp;ust=1725019577827000&amp;usg=AOvVaw2BRTeSRU7tbCZsRsIrVRdf"
                    ><img
                      src="https://ci3.googleusercontent.com/meips/ADKq_NbKiDnhFfOAVr_X7wxGJlyVxY1JjjFSBZ7V-Xz7QqnmEG9ofVIyrlHH02gtNgxfvU3cqQkShDp5EpgfacA37f-M4L2sMthYT8nt91EYU9sRlb_09nvaNZqmrnMMZ92Y_XOP-pAsFjTZojSQ=s0-d-e1-ft#https://id-mail-assets.atlassian.com/shared/id-summit/id-summit-logo-email-footer.png"
                      width="114"
                      border="0"
                      alt="Atlassian"
                      style="
                        border: 0;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                        display: block;
                        color: #4c9ac9;
                      "
                      class="CToWUd"
                      data-bit="iit"
                  /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
}

// export const paramsDecodeUrlBase64 = () => {
//   const urlParams = window.location.search.substring(1)
//   const base64String = decodeURIComponent(urlParams)
//   const jsonString = atob(base64String)
//   const objParams = JSON.parse(jsonString)
//   return objParams
// }



export const paramsDecodeUrlBase64 = () => {
  const urlParams = window.location.href.split('/').pop()
  const base64String = decodeURIComponent(urlParams)
  const jsonString = atob(base64String)
  const objParams = JSON.parse(jsonString)
  return objParams
}

export const toastMessage = (props) => {
  toast[props.type](props.message,
    {
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce
    }
  )
}