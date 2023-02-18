var $ = document.querySelector.bind (document)
var $$ = document.querySelectorAll.bind (document)



var inputTime = $$('input')
var timeDuration = $('.clock')
var setTimeBtn = $('button')
var timeContainer = $('.countdown-container');
var playTime = $('.play')

var App = {
    // 360 độ sẽ hiện lên vòng tròn vào sẽ giảm dần theo thời gian
    deg:  360,

    // Khai báo cho bộ đếm ngược
    countDown: setInterval (()=> {}, 0),

    // Khai báo cho vòng tròn 
    timeDuration: setInterval (() => {}, 0),

    // set độ giá trị cho vòng ban đầu
    setDurationClock(deg) {
        timeDuration.style.backgroundImage = `conic-gradient(red ${deg}deg, red 0deg, white 0deg, white 360deg)`;
    },


    // xử lý nhập dữ liệu
    handleInputEvent () {
        Array.from (inputTime).forEach (input => {
            // biến để lưu lại input.value khi nhận kh quá 2 kí tự 
            var currentInput = '';
            
            // click vào thì ô input phải bị xóa hết 
            input.onclick = () => {
                input.value = '';
            }

            // input chỉ nhập đc 2 số và phải nhỏ hơn hẵn 60 
            input.oninput = () => {
                if (input.value) {
                    // Xử lý nhập tối đa 2 kí tự
                    if (input.value.length <= 2) {
                        currentInput = input.value;
                    }
                    else input.value = currentInput;


                    // Xử lý nhập tối đa là 59 và nếu lớn hơn thì kh thể nhập
                    if (parseInt(input.value) > 59) {
                        input.value = currentInput[0];
                    }
                }
            }

            // Xử lý khi hoàn tất input (bấm ra ngoài ô input)
            input.onblur = () => {
                // nếu kh có value => trả ra "00"
                if (!input.value) {
                    input.value = "00";
                }

                // nếu có giá trị thì kiểu ra đủ 2 số chưa
                if (input.value) {
                    if (input.value.length === 1) {
                        input.value = '0' + input.value;
                    }
                }
            }
        })
    },


    // Xử lý set thời gian lên khung 
    handleSetTime () {
        setTimeBtn.onclick = () => {
            this.deg = 360
            clearInterval(this.countDown);
            clearInterval (this.timeDuration);
            // Biến để kiểm tra người dùng có nhập số không
            var isSet = false;

            // duyệt qua các thẻ input lấy giá trị rồi để vào mảng sao đó join() để ghép thành chuỗi
                var result = Array.from (inputTime).reduce ((acc, cur, index) => {
                if (index < inputTime.length-1) {
                    acc.push (cur.value + ':')
                }
                else {
                    acc.push (cur.value)
                }
                return acc;
            }, []).join('')

            // Kiểm tra người dùng có nhập số không
            Array.from (inputTime).forEach (input => {
                if (input.value != '00') isSet = true;
            })
            
            // render ra giao diện và set cho vòng tròn ở trạng thái bắt đầu 
            // NOTICE: dùng đc THIS do đang ở trong ARROW FUNCTION
            if (isSet) {
                timeContainer.innerHTML = result;
                this.setDurationClock(this.deg);
                this.getTimes();
                this.handleCountDownEvent ();
            }  
            else {
                alert ("Bạn vui lòng nhập thời gian cần đếm ngược!")
            }
        }
    },


    // Lấy ra thời gian từ inputs
    getTimes () {
        var totalTimes = Array.from (inputTime).reduce ((acc, cur, index) => {
            // index = 0 là giờ
            if (index === 0) {
                return acc + parseInt(cur.value)*3600
            }
            // index = 1 là phút
            else if (index === 1) {
                return acc + parseInt(cur.value)*60
            }
            // index = 2 là giây
            else return acc + parseInt(cur.value)
        },0)       

        return totalTimes
    },



    // Render lại khi đếm ngược 
    reRender(hours, minutes, seconds) {
        timeContainer.innerHTML = 
        (((hours.toString().length < 2) ? ('0' + hours) :  hours)
        + ":" + ((minutes.toString().length < 2) ? ('0' + minutes) :  minutes)
        + ":" + ((seconds.toString().length < 2) ? ('0' + seconds) :  seconds))
    },



    // Xử lý đếm ngược 
    handleCountDownEvent () {
        playTime.onclick = () => {
            // clear bộ đếm 
            clearInterval (this.countDown);
            clearInterval (this.timeDuration);
            playTime.classList.toggle ("is_playing")

            // Nếu có is_playing thì cho đồng hồ chạy
            if (playTime.classList.contains ('is_playing')) {

                // tính current times và thực hiện countDown 
                var times = timeContainer.innerText.split(":");
                var hours = parseInt(times[0]) 
                var minutes = parseInt(times[1])
                var seconds = parseInt(times[2])
                currentTimes = hours*3600 + minutes*60+seconds;

                //Render sau khi tính 
                this.reRender (hours, minutes, seconds)
                this.countDown = setInterval (()=> {
                    // Xử lý đếm ngược và render lại sau mỗi lần đếm ngược 
                    if (seconds > 0) {
                        seconds--;
                        this.reRender (hours, minutes, seconds)
                        
                    }
                    else if (seconds == 0 && minutes > 0) {
                        minutes--;
                        seconds = 59;
                        this.reRender (hours, minutes, seconds)
                        
                    }  
                    else if (hours > 0 && minutes == 0 && seconds == 0) {
                        hours --;
                        minutes = 59;
                        seconds = 59;
                        this.reRender(hours, minutes, seconds);
                    }

                    // Nếu hết thời gian đếm ngược thì dừng đếm
                                            
                        if (currentTimes === 0) {
                            clearInterval (this.countDown) 
                            clearInterval (this.timeDuration)
                            
                            // Thông báo hết thời gian
                            alert ("TIME OUT!")
                            
                            // Đặt lại thời gian trên inputs
                            Array.from (inputTime).forEach (input => {
                                input.value = "00";
                            }) 
                        }
                        // Tiếp tục đếm
                        
                        else {
                            currentTimes--;
                        
                        }
                    }, 1000)

                    // Xử lý vòng xoay 
                    this.timeDuration = setInterval(() => {
                        if (this.deg > 0) {
                            this.deg--;
                        }
                        this.setDurationClock (this.deg);
                    }, currentTimes*1000/this.deg);
                    // lấy thời gian chia tổng số độ sẽ ra 1 độ chạy hết bao nhiêu s  
            }
        }
    },

    start () {
      this.setDurationClock(0);  
      this.handleInputEvent();
      this.handleSetTime();
    }
}


App.start();
