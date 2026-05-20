package string;

public class stringEqual {
  public static void main(String args[]){
    String s1 = "tony";
    String s2 = "tony";
    String s3 = new String("tony");
    if(s1==s2){
      System.out.println("String are equal");
    }else{
      System.out.println("String are not equal");
    }



    if(s1==s3){
      System.out.println("String are equal");
    }else{
      System.out.println("String are not equal");
    }

      //function

    if(s1.equals(s3)){
      System.out.println("String are equal");
    }else{
      System.out.println("String are not equal");
    }
  }
  
}
