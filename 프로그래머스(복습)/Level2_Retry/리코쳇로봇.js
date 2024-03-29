function solution(board) {
  // R을 처음위치
  // D는 장애물의 위치
  // G는 목표지점의 위치

  // bfs로 해결하면 될듯

  // start 지점에서 계속 찾아나가기

  // G를 만나면 return

  // 만약안되면 return -1

  const visited = [];

  board.forEach((arr) => {
    const visitedArr = Array.from({ length: arr.length }, () => false);
    visited.push(visitedArr);
  });
  const dx = [1, 0, -1, 0];
  const dy = [0, 1, 0, -1];
  let count = 0;
  const bfs = (i, j) => {
    const queue = [[i, j]];
    visited[i][j] == true;

    while (queue.length > 0) {
      const queueLength = queue.length;

      for (let i = 0; i < queueLength; i++) {
        const [x, y] = queue.shift();
        for (let j = 0; j < 4; j++) {
          const nx = dx[j] + x;
          const ny = dy[j] + y;

          if (
            nx >= 0 &&
            ny >= 0 &&
            nx < board.length &&
            ny < board.length &&
            visited[nx][ny] === false &&
            board[i][j] !== "D"
          ) {
            queue.push([nx, ny]);
            visited[nx][ny] = true;
            if (board[nx][ny] === "G") {
              return count + 1;
            }
          }
        }
      }
      count = count + 1;
    }
    return -1;
  };

  for (let i = 0; i < board.length; i++) {
    const startIndex = board[i].indexOf("R");
    if (startIndex !== -1) {
      return bfs(i, startIndex);
    }
  }
}

function solution(board) {
  const visited = [];

  board.forEach((arr) => {
    const visitedArr = Array.from({ length: arr.length }, () => false);
    visited.push(visitedArr);
  });
  let answer = 0;

  const bfs = (i, j) => {
    const queue = [[i, j]];
    visited[i][j] = true;
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    while (queue.length > 0) {
      const queueLength = queue.length;
      console.log(queue);
      for (let i = 0; i < queueLength; i++) {
        const [x, y] = queue.shift();
        for (let j = 0; j < 4; j++) {
          let nx = x + dx[j];
          let ny = y + dy[j];
          while (
            nx + dx[j] >= 0 &&
            ny + dy[j] >= 0 &&
            nx + dx[j] < board.length &&
            ny + dy[j] < board[0].length &&
            board[nx + dx[j]][ny + dy[j]]
          ) {
            nx = nx + dx[j];
            ny = ny + dy[j];
          }

          //여길 거치고나면 마지막 nx, ny가 발생함
          if (board[nx][ny] === "G") {
            return answer + 1;
          }
          if (!visited[nx][ny]) {
            queue.push([nx, ny]);
            visited[nx][ny] = true;
          }
        }
      }
      answer = answer + 1;
    }
    return -1;
  };

  return bfs(0, 6);
}
function solution(board) {
  const visited = [];

  board.forEach((arr) => {
    const visitedArr = Array.from({ length: arr.length }, () => false);
    visited.push(visitedArr);
  });
  let answer = 0;

  const bfs = (i, j) => {
    const queue = [[i, j]];
    visited[i][j] = true;
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    while (queue.length > 0) {
      const queueLength = queue.length;
      for (let i = 0; i < queueLength; i++) {
        const [x, y] = queue.shift();
        for (let j = 0; j < 4; j++) {
          let nx = x;
          let ny = y;
          while (
            nx + dx[j] >= 0 &&
            ny + dy[j] >= 0 &&
            nx + dx[j] < board.length &&
            ny + dy[j] < board[0].length &&
            board[nx + dx[j]][ny + dy[j]] !== "D"
          ) {
            nx = nx + dx[j];
            ny = ny + dy[j];
          }

          //여길 거치고나면 마지막 nx, ny가 발생함
          if (board[nx][ny] === "G") {
            return answer + 1;
          }
          if (!visited[nx][ny]) {
            queue.push([nx, ny]);
            visited[nx][ny] = true;
          }
        }
      }
      answer = answer + 1;
    }
    return -1;
  };

  for (let i = 0; i < board.length; i++) {
    const start = board[i].indexOf("R");
    if (start !== -1) {
      return bfs(i, start);
    }
  }
}
function solution(board) {
  // 리코쳇
  // 시작위치에서 목표위치까지 최소 몇번만에가는지

  // D G 또는 벽이면 멈추기
  // 도착지점이 처음이면 go 아니면 안가

  const visited = [];
  // 방문을 check하는함수
  board.forEach((item) => {
    const arr = Array.from({ length: item.length }, () => false);
    visited.push(arr);
  });
  let count = 0;

  const bfs = (i, j) => {
    const queue = [[i, j]];
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    visited[i][j] = true;

    while (queue.length > 0) {
      const queueLength = queue.length;
      for (let i = 0; i < queueLength; i++) {
        let [x, y] = queue.shift();
        // 맨 앞의 x,y를 꺼냄
        for (let j = 0; j < 4; j++) {
          let nx = x;
          let ny = y;
          while (
            nx + dx[j] >= 0 &&
            ny + dy[j] >= 0 &&
            nx + dx[j] < board.length &&
            ny + dy[j] < board[0].length &&
            board[nx + dx[j]][ny + dy[j]] !== "D"
          ) {
            //만약 미리 움직여봐고 다음 과정이 가능한 과정이면 계속 전진
            nx = nx + dx[j];
            ny = ny + dy[j];
          }

          if (!visited[nx][ny]) {
            if (board[nx][ny] === "G") {
              return count + 1;
            }
            visited[nx][ny] = true;
            //마지막으로 도착한 곳이 방문하지 않은 곳이라면
            queue.push([nx, ny]);
          }
        }
      }
      count = count + 1;
    }
    //while이 한번끝나면 한번 이동한거니까
    return -1;
  };

  //여기서 이제 R을 찾으면됨
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === "R") {
        return bfs(i, j);
      }
    }
  }
}
