package Array1D;
import java.util.*;
public class copyarr {
  public static void main(String[]args){
    Scanner sc = new Scanner(System.in);
    System.out.println("Enter size of array");
    int n = sc.nextInt();
    int arr1[] = new int[n];
     int arr2[] = new int[n];

     //input element

     System.out.println("Enter array element");
     for (int i = 0; i<n; i++) {
        arr1[i] = sc.nextInt();
         
     }

     // copy element

     for (int i = 0; i <n; i++) {
        arr2[i] = arr1[i];
         
     }
    
     // print copy arr

     System.out.println("copy element array");
     for (int i = 0; i <n; i++) {
         System.out.println(arr2[i]+" ");
         
     }
    }
    }
    
    
  

  

