package Array1D;
import java.util.*;

public class combineTwoArr {
  public static void main(String []args){
    Scanner sc = new Scanner(System.in);
    System.out.println("Enter size of array");
    int n = sc.nextInt();

   int arr1[] = new int[n];
   int arr2[] = new int [n];
   int arr3[] = new int[n];
   
   // input first array

   System.out.println("Enter first array element");
   for(int i = 0; i<arr1.length;i++){
    arr1[i] = sc.nextInt();
   }

   // input second element

   System.out.println("Enter second element");
   for(int i = 0; i<arr2.length;i++){
    arr2[i] = sc.nextInt();
   }

   // add array

   for (int i = 0; i < n; i++) {
     arr3[i] = arr1[i]+arr2[i];
       
   }

   // print result

   for(int i =0;i<arr3.length; i++){
    System.out.println(arr3[i]+" ");
   }
  }
  
}
