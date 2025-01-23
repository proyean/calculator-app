
#include<iostream>
#include<string>

using namespace std;

const int maxBooks=100;
struct Book
{
    string title;
    
      string author;
      int id;
      bool available;
};
struct Library 
{
    int adjacentId;
    int numBook;
    Book books[maxBooks];
    string storeBook;
};


int main(){
    Library lab;
    lab.adjacentId=1;
    lab.numBook=0;
    
    
    
    
    int choice;
    while (true){
         cout << "Library Management System Menu \n";
         cout << "1. Add A Book \n";
         cout << "2. Display All Books \n";
         cout << "3. Find A Book By Id \n";
         cout << "4. Remove A Book By Id \n";
         cout << "5. Check Out A Book\n";
         cout << "6. Return A Book\n";
         cout << "7. Exit\n";
         cout << " Enter Your Choice";
         cin>>choice;

          switch (choice){
    
           case 1:{
              if (lab.numBook< maxBooks)
               {
                  cout<< "Enter book title ";
                  cin.ignore();
                  getline(cin,lab.books[lab.numBook].title);
                  cout<< "Enter book author ";
                  getline(cin,lab.books[lab.numBook].author);

                    lab.books[lab.numBook].id = lab.adjacentId;
                    lab.books[lab.numBook].available = true;
                    lab.adjacentId++;
                    lab.numBook++;
                   cout << " Book added successfuly.\n";
                
               } 
              else {
                   cout << " Library is full, you cannot add more books";
               }
             break;
             }
           
            case 2:{
             cout << "Library Catalog \n";
             for(int i =0; i < lab.numBook; i++){
                cout<<"ID "<< lab.books[i].id<< ", Title "<<lab.books[i].title << ", Author" << lab.books[i].author;
            
                if (lab.books[i].available){
                    cout<<"(Available)\n";
                }
                else{
                    cout << "(Checked Out)\n";
            
                }
             }
    
             break;
             }
  
            case 3:{
                int id ;
                 cout<< "Enter book ID ";
                 cin>> id;
                 bool found = false;

                 for(int i = 0 ; i< lab.numBook ; i++){
                     if(lab.books[i].id == id){
                         cout << "Book Found\n";
                         cout<<"ID "<< lab.books[i].id<< ", Title "<<lab.books[i].title << ", Author" << lab.books[i].author;
                         found = true;
                         break;
                         }
                    }
               if(!found){
              cout << "Book Not Found\n";

               }
               break;
            }
           
           case 4:{
            int id ;
                 cout<< "Enter book ID To Remove ";
                 cin>> id;
                 bool remove = false;
                  for(int i = 0 ; i< lab.numBook ; i++){
                     if(lab.books[i].id == id){

                        for(int j = i ; j< lab.numBook-1 ; j++){

                            lab.books[j] = lab.books[j+1];
                        }

                        lab.numBook--;
                        remove = true;
                        cout << "Book Removed Successfully\n";
                        break;
                         }
                    }

               if(!remove){
              cout << "Book Not Found\n";

               }
              break;
              }

            case 5:{
            int id ;
                 cout<< "Enter book ID To Check Out ";
                 cin>> id;
                 bool checkOut = false;
                  for(int i = 0 ; i< lab.numBook ; i++){
                     if(lab.books[i].id == id){
                         if(lab.books[i].available){

                            lab.books[i].available = false;

                         }                    
            
                        cout << "Book Checked Out Successfully\n";
                        break;
                         }
                         else{
                            cout<<" Book Is Already Checked Out\n";
                         }
                          checkOut = true;
                    }

               if(!checkOut){
              cout << "Book Not Found\n";

               }
              break;
            }
            case 6:{
            int id ;
                 cout<< "Enter book ID To Return ";
                 cin>> id;
                 bool returned = false;
                  for(int i = 0 ; i< lab.numBook ; i++){
                     if(lab.books[i].id == id){
                         if(lab.books[i].available){

                            lab.books[i].available = true;                         

                         }                    
            
                        cout << "Book Returned Out Successfully\n";
                        break;
                         }
                         else{
                            cout<<" Book Is Already Returned\n";
                         }
                          returned = true;
                    }

               if(!returned){
              cout << "Book Not Found\n";

               }
              break;
            }

            case 7:{
                cout<<"Exiting the program\n";
                return 0;
              default:
              cout<<"Invalid Choice ,Please Try Again\n";

            }
          }    
        }

         return 0;
}