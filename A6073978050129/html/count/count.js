
function tabbar(obj){
   var tem=$(obj);

tem.addClass("active");
$("#jin").removeClass("active");
$("#way").attr("value",0);
$("#jian").addClass("hidden");
}
function tabbar2(obj){
  var tem2=$(obj);
  tem2.addClass("active");
  $("#xi").removeClass("active");
  $("#way").attr("value",1);
  $("#jian").removeClass("hidden");
  //  alert( $("#way").val());
}

function start(){
 if($("#way").val()==0){
    if($("#leixin").val()==0){
      var money=$("#number").val()*10000;
      var mouth=$("#mouth").val();
      var lilv=$("#lilv").val()/100/12;
      var payment=(money*lilv*((1+lilv)**mouth))/((1+lilv)**mouth-1);
      $("#yuegong").text(payment.toFixed(2));
      $("#zonge").text((payment * mouth).toFixed(2));
      $("#lixi").text((payment*mouth-money).toFixed(2));
    }
    else if ($("#leixin").val()==1) {
      var money=$("#number").val()*10000;
      var mouth=$("#mouth").val();
      var lilv=$("#lilv2").val()/100/12;
      var payment=(money*lilv*((1+lilv)**mouth))/((1+lilv)**mouth-1);
      $("#yuegong").text(payment.toFixed(2));
      $("#zonge").text((payment * mouth).toFixed(2));
      $("#lixi").text((payment*mouth-money).toFixed(2));

    }
    else if ($("#leixin").val()==2) {
      var money1=$("#kuan1").val()*10000;
      var money2=$("#kuan2").val()*10000;
      var mouth=$("#mouth").val();
      var lilv1=$("#lilv3").val()/100/12;
      var lilv2=$("#lilv4").val()/100/12;
      var payment1 = (money1 * lilv1 * ((1 + lilv1) ** mouth)) / ((1 + lilv1) ** mouth - 1);
        var payment2 = (money2 * lilv2 * ((1 + lilv2) ** mouth)) / ((1 + lilv2) ** mouth - 1);
        $("#yuegong").text((payment1+payment2).toFixed(2));
        $("#zonge").text(((payment1 + payment2) * mouth).toFixed(2));
        $("#lixi").text(((payment1 + payment2) * mouth - (money1+money2)).toFixed(2));
    }

}
else if ($("#way").val()==1) {
  if($("#leixin").val()==0){
    var money=$("#number").val()*10000;
    var mouth=$("#mouth").val();
    var lilv=$("#lilv").val()/100/12;
    var payment=(money/mouth)+(money*lilv);
    $("#yuegong").text(payment.toFixed(2));
    $("#zonge").text(((mouth+1)*money*lilv/2+money).toFixed(2));
    $("#lixi").text(((mouth + 1) * money * lilv / 2).toFixed(2));
    $("#dijian").text((money / mouth * lilv).toFixed(2));
  }
  else if ($("#leixin").val()==1) {
    var money=$("#number").val()*10000;
    var mouth=$("#mouth").val();
    var lilv=$("#lilv2").val()/100/12;
    var payment=(money / mouth) + (money * lilv);
    $("#yuegong").text(payment.toFixed(2));
    $("#zonge").text(((mouth+1)*money*lilv/2+money).toFixed(2));
    $("#lixi").text(((mouth + 1) * money * lilv / 2).toFixed(2));
    $("#dijian").text((money / mouth * lilv).toFixed(2));

  }
  else if ($("#leixin").val()==2) {
    var money1=$("#kuan1").val()*10000;
    var money2=$("#kuan2").val()*10000;
    var mouth=$("#mouth").val();
    var lilv1=$("#lilv3").val()/100/12;
    var lilv2=$("#lilv4").val()/100/12;
    var payment1 =(money1 / mouth) + (money1 * lilv1);
      var payment2 = (money2 / mouth) + (money2 * lilv2);
      var   sign1= (money1 / mouth * lilv1);
      var    sign2= (money2 / mouth * lilv2);
      var allmoney1= ((mouth + 1) * money1 * lilv1/ 2 + money1);
       var  allmoney2= ((mouth + 1) * money2 * lilv2 / 2 + money2);
       var  interest1=((mouth + 1) * money1 * lilv1 / 2);
        var   interest2= ((mouth + 1) * money2 * lilv2 / 2);
      $("#yuegong").text((payment1 + payment2).toFixed(2));
      $("#zonge").text(((allmoney1 + allmoney2) ).toFixed(2));
      $("#lixi").text(((interest1 + interest2) ).toFixed(2));
      $("#dijian").text( (sign1 + sign2).toFixed(2));

  }
}
}

function leixin(){
if($("#leixin").val()==0){
$("#dai").removeClass("hidden");
$("#gong").addClass("current");
$("#sang").removeClass("current");
$("#gong2").removeClass("current");
$("#sang2").addClass("hidden");
$("#dai2").addClass("hidden");
}
else if ($("#leixin").val()==1) {
$("#dai").removeClass("hidden");
$("#gong").removeClass("current");
$("#sang").addClass("current");
$("#gong2").removeClass("current");
$("#sang2").addClass("hidden");
$("#dai2").addClass("hidden");
}
else if ($("#leixin").val()==2) {
$("#gong").removeClass("current");
$("#dai").addClass("hidden");
$("#sang").removeClass("current");
$("#gong2").addClass("current");
$("#sang2").removeClass("hidden");
$("#dai2").removeClass("hidden");
}
}


apiready = function() {
  glo.init();
}
