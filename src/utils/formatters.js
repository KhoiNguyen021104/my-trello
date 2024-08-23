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