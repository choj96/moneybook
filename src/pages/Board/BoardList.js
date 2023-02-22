import React, { useState } from "react";
import * as css from "../../styles/Styles";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import moment from "moment/moment";
import { useEffect } from "react";
// import Paging from "./Paging";
import axios from "axios";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router";

// http://192.168.0.151:9898/swagger-ui/index.html#/

const BoardList = () => {
  const navigate = useNavigate();
  const [postlist, setpostList] = useState([]);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);

  const post = async () => {
    try {
      const res = await axios.get(
        `http://192.168.0.151:9898/board/show/list/1?page=${page}&size=8`
      );
      setpostList(res.data.content);
      setData(res.data);
      console.log(res.data.totalElements);
    } catch (err) {
      console.log(err);
    }
  };
  const handlePageChange = (count) => {
    let tempPage = count - 1;
    if (tempPage < 0) {
      tempPage = 0;
    }
    console.log(tempPage);
    setPage(tempPage);
    // console.log(page);
  };

  useEffect(() => {
    console.log("변경 현재페이지: ", page);
    post();
  }, [page]);

  return (
    <css.BoardList>
      <div className="postList">
        {postlist.map((item, index) => (
          <div
            className="post"
            key={index}
            onClick={() => {
              navigate("/BoardView");
            }}
          >
            <p>{item.title}</p>
            <div className="postDetail">
              <div className="postIcon">
                <FaRegComment />
                <span>{item.comment}</span>
                <FaRegThumbsUp />
                <span>{item.likes}</span>
              </div>
              <span>{moment(item.regDt).format("YYYY-MM-DD")}</span>
            </div>
          </div>
        ))}
      </div>
      <css.Paging>
        <Pagination
          activePage={page + 1} //현재페이지
          itemsCountPerPage={data.size} //한 페이지당 보여줄 리스트 아이템의 개수
          totalItemsCount={parseInt(data.totalElements)} //총 아이템의 개수
          pageRangeDisplayed={5} //Paginator 내에서 보여줄 페이지의 범위
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </css.Paging>
    </css.BoardList>
  );
};

export default BoardList;
